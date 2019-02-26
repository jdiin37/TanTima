package service;

import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.dateutility.DateComputeUtil;
import library.dateutility.DateUtil;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import library.utility.PTListUtil;
import model.*;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static library.dateutility.DateUtil.dateToROCDateString;
import static library.utility.MapUtil.*;

/**
 * Created by jeffy on 2018/5/10.
 */
public class PatientListService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private Patinp patinp;
    private PTListUtil ptListUtil;
    private Bed bed;
    private ChartCtl chartCtl;
    private Admit admit;
    private URIRecord uriRecord;

    private int getAge(String birthDate) {
        int age = 0;
        String dateString = DateUtil.isVaildDate(birthDate);
        if (!(dateString == null || dateString.isEmpty())) {
            String today = DateUtil.dateToROCDateString(LocalDate.now());
            age = DateComputeUtil.getAgesByYear(dateString, today);
        }

        return age;
    }

    private String getHeBedNo(String bedNo) {
        String heBedNo = bedNo;

        try {
            Map<String, Object> mapResult = bed.queryHeBedNoByBedNo(bedNo);

            if (!mapResult.isEmpty()) {
                heBedNo = castToStr(mapResult.get("he_bed_no"));
            }
        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        }

        return heBedNo;
    }

    private String checkIsChartCtl(int chartNo, String baseDate) {
        List<Map<String, Object>> chartCtlMapList;
        String result = "N";
        try {
            chartCtlMapList = chartCtl.queryChartCtlByChartNoCkinDate(chartNo, baseDate);
            if (chartCtlMapList.size() > 0) result = "Y";
        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        }
        return result;
    }

    private Map<String, Object> getPreAdmitData(int chartNo, int serno) {
        Map<String, Object> preAdmitMap = new LinkedHashMap<>();
        try {

            preAdmitMap = admit.queryPreAdmitDataByChartNoSerno(chartNo, serno);

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        }
        return preAdmitMap;
    }

    private String getURIMessage(int chartNo, int serno, String ckinDate) {
        String startDate = DateUtil.dateToROCDateString(DateUtil.rocDateStringToDate(ckinDate).plus(-14, ChronoUnit.DAYS));
        String endDate = ckinDate;
        String uriMessage = "";

        // 取得此次住院日前14天，住院診斷碼包含於 J00 ~ J99
        try {
            List<Map<String, Object>> inpUriMapList =
                    uriRecord.queryINPUriByChartNoSerNoDateRange(chartNo, serno, startDate, endDate);

            if (!inpUriMapList.isEmpty()) {
                List<String> stringList = inpUriMapList.stream()
                        .map(map -> "(" + castToStr(map.get("disease_code")) + ")" + castToStr(map.get("code_name_c")))
                        .collect(Collectors.toList());
                uriMessage = String.join(";", stringList);
                uriMessage = "14日內住院有URI症狀：" + uriMessage;
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        }

        // 取得此次住院日前14天，門診診斷碼包含於 J00 ~ J99
        if (emptyToNull(uriMessage) == null) {
            try {
                List<Map<String, Object>> opdUriMapList =
                        uriRecord.queryOPDUriByChartNoDateRange(chartNo, startDate, endDate);

                if (!opdUriMapList.isEmpty()) {
                    List<String> stringList = opdUriMapList.stream()
                            .map(map -> "(" + castToStr(map.get("disease_code")) + ")" + castToStr(map.get("code_name_c")))
                            .collect(Collectors.toList());
                    uriMessage = String.join(";", stringList);
                    uriMessage = "14日內門診有URI症狀：" + uriMessage;
                }

            } catch (SQLException ex) {
                JDBCUtilities.printSQLException(ex);
            }
        }

        return uriMessage;
    }


    private String checkAdmitIn14Days(int chartNo, int serno, String ckinDate) {
        String result = "N";
        Map<String, Object> preAdmitMap = getPreAdmitData(chartNo, serno);

        if (!preAdmitMap.isEmpty()) {
            String preDischargeDate = castToStr(preAdmitMap.get("discharge_date"));

            if (emptyToNull(preDischargeDate) != null) {
                result = DateComputeUtil.getAdmitDays(preDischargeDate, ckinDate) < 14 ? "Y" : "N";
            }
        }

        return result;
    }

    private String checkAdmitOver30Days(String ckinDate, String dischargeDate) {
        if (emptyToNull(dischargeDate) == null) dischargeDate = dateToROCDateString(LocalDate.now());
        return DateComputeUtil.getAdmitDays(ckinDate, dischargeDate) > 30 ? "Y" : "N";
    }

    private List<Map<String, Object>> addExtraDataToPaientList(List<Map<String, Object>> patientMapList) {
        List<Map<String, Object>> resultMapList = new ArrayList<>();

        if (!patientMapList.isEmpty()) {
            resultMapList.addAll(patientMapList);

            int chartNo = 0;
            int serno = 0;
            String ckinDate = "";
            String dischargeDate = "";
            long admitDays = 0;
            String birthDate = "";
            String bedNo = "";
            String uriMsg = "";

            for (Map<String, Object> map : resultMapList) {
                chartNo = castToInt(map.get("chart_no"));
//                serno = castToInt(map.get("serno"));
                ckinDate = castToStr(map.get("ckin_date"));
                dischargeDate = castToStr(map.get("discharge_date"));
                birthDate = castToStr(map.get("birth_date"));
//                bedNo = castToStr(map.get("bed_no"));

//                map.put("age", getAge(birthDate));
//                map.put("he_bed_no", getHeBedNo(bedNo));
                map.put("status", ptListUtil.getPatinpStatus(map));
                map.put("admit_days", DateComputeUtil.getAdmitDays(ckinDate, dischargeDate) + 1);

//                map.put("is_ctrl", checkIsChartCtl(chartNo, ckinDate));
//                uriMsg = getURIMessage(chartNo, serno, ckinDate);
//                if (emptyToNull(uriMsg) != null) {
//                    map.put("is_uri", "Y");
//                    map.put("uri_msg", uriMsg);
//                }
//                map.put("in14days", checkAdmitIn14Days(chartNo, serno, ckinDate));
//                map.put("over30days", checkAdmitOver30Days(ckinDate, dischargeDate));
            }
        }
        return resultMapList;
    }

    public String getPatinpListInp() {
        List<Map<String, Object>> resultMapList;
        try {
            objects = patinp.queryPatinpListInp();

            if (!objects.isEmpty()) {
                resultMapList = addExtraDataToPaientList(objects);
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(resultMapList));
            } else {
                jsonObject = MapUtil.getFailureResult("Patinp.queryPatinpListInp No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    public String getPatinpListByChartNo(int chartNo) {
        List<Map<String, Object>> resultMapList;
        try {
            objects = patinp.queryPatinpListByChartNo(chartNo);
            if (!objects.isEmpty()) {
                resultMapList = addExtraDataToPaientList(objects);
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(resultMapList));
            } else {
                jsonObject = MapUtil.getFailureResult("Patinp.queryPatinpListByChartNo No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    @Override
    public String run(JsonObject parametersJsObj) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String result = null;

        try {
            myConnection = jdbcUtil.getConnection();
            patinp = new Patinp(myConnection);
            ptListUtil = new PTListUtil(myConnection);
            bed = new Bed(myConnection);
            chartCtl = new ChartCtl(myConnection);
            admit = new Admit(myConnection);
            uriRecord = new URIRecord(myConnection);
            String empNo = parametersJsObj.get("empNo").getAsString();
            String method = parametersJsObj.get("method").getAsString();

            //  get inp patient list
            if (method.equals("getPatinpListInp")) {
                result = getPatinpListInp();
            }

            //  get discharge patient list
            if (method.equals("getPatinpListByChartNo")) {
                int chartNo = parametersJsObj.get("chartNo").getAsInt();
                result = getPatinpListByChartNo(chartNo);
            }

            //  get URIMessage by chartNo, serno, ckinDate
            if (method.equals("getURIMessage")) {
                int chartNo = parametersJsObj.get("chartNo").getAsInt();
                int serno = parametersJsObj.get("serno").getAsInt();
                String ckinDate = parametersJsObj.get("ckinDate").getAsString();
                result = getURIMessage(chartNo, serno, ckinDate );
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) { JDBCUtilities.closeConnection(myConnection); }
        }
        return result;
    }


    public static void main(String[] args) {
        JsonObject jsonObject = new JsonObject();
        //Map<String, String> map = new LinkedHashMap<>();
        PatientListService patientListService = new PatientListService();
        String resultStrng;

        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("method", "getPatinpListInp");
        long start = System.nanoTime();
        resultStrng = patientListService.run(jsonObject);
        long end = System.nanoTime();
        System.out.println("\nDuration:" + (end-start) / 1000000 + " milliseconds.");
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nPatientListService.run getPatinpListInp : " + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("chartNo", 77384);
        jsonObject.addProperty("method", "getPatinpListByChartNo");
        resultStrng = patientListService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nPatientListService.run getPatinpListByChartNo chartNo=77384 : " + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
//        jsonObject.addProperty("chartNo", 77384);
//        jsonObject.addProperty("serno", 135286);
//        jsonObject.addProperty("ckinDate", "1050510");
        jsonObject.addProperty("chartNo", 6803);
        jsonObject.addProperty("serno", 148345);
        jsonObject.addProperty("ckinDate", "1060115");
        jsonObject.addProperty("method", "getURIMessage");
        start = System.nanoTime();
        resultStrng = patientListService.run(jsonObject);
        end = System.nanoTime();
        System.out.println("\nDuration:" + (end-start) / 1000000 + " milliseconds.");
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nPatientListService.run getURIMessage chartNo=77384 serno=135286 ckinDate='1050510' : " + resultStrng);

    }
}

