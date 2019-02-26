package service;

import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.dateutility.DateUtil;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import library.utility.TableUtil;
import model.TPRRecord;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static library.utility.MapUtil.castToInt;

/**
 * Created by jeffy on 2018/5/15.
 */
public class TPRRecordMADService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private TPRRecord tprRecord;
    private TableUtil tableUtil;
    private List<String> pkColNames;
    private List<String> noNullColNames;
    private List<String> tableColNames;
    private List<Map<String, Object>> tableMetaData;
    private String resultString;

    public void getTableConstrains(String tableName, TableUtil tableUtil) throws SQLException {
        pkColNames = tableUtil.getPKColNames(tableName);
        tableMetaData =  tableUtil.getTableMetaData(tableName);
        noNullColNames = tableUtil.getNoNullColNames(tableMetaData);
        tableColNames = tableUtil.getTableColNames(tableMetaData);
    }

    public String insertTPRRecord(Map<String, Object> dataParametersMap) {
        try {
            Integer chartNo = MapUtil.castToInteger(dataParametersMap.getOrDefault("chart_no", null));
            Integer serno = MapUtil.castToInt(dataParametersMap.getOrDefault("serno", null));
            String assessDate = MapUtil.castToStr(dataParametersMap.getOrDefault("assess_date", null));
            String assessTime = MapUtil.castToStr(dataParametersMap.getOrDefault("assess_time", null));
            Double temperature = MapUtil.castToDouble(dataParametersMap.getOrDefault("temperature", null));
            Integer systolicPressure = MapUtil.castToInt(dataParametersMap.getOrDefault("systolic_pressure", null));
            Integer diastolicPressure = MapUtil.castToInteger(dataParametersMap.getOrDefault("diastolic_pressure", null));
            Integer pulse = MapUtil.castToInteger(dataParametersMap.getOrDefault("pulse", null));
            Integer respiration = MapUtil.castToInteger(dataParametersMap.getOrDefault("respiration", null));
            Double weight = MapUtil.castToDouble(dataParametersMap.getOrDefault("weight", null));
            Integer ivFluids = MapUtil.castToInteger(dataParametersMap.getOrDefault("iv_fluids", null));
            Integer urine = MapUtil.castToInteger(dataParametersMap.getOrDefault("urine", null));
            String stool = MapUtil.castToStr(dataParametersMap.getOrDefault("stool", null));
            String keyinClerk = MapUtil.castToStr(dataParametersMap.getOrDefault("keyin_clerk", null));
            String keyinDate = MapUtil.castToStr(dataParametersMap.getOrDefault("keyin_date", null));
            String keyinTime = MapUtil.castToStr(dataParametersMap.getOrDefault("keyin_time", null));
            Integer bleed = MapUtil.castToInteger(dataParametersMap.getOrDefault("bleed", null));
            Integer amnioticFluid = MapUtil.castToInteger(dataParametersMap.getOrDefault("amniotic_fluid", null));
            Integer drainageL = MapUtil.castToInteger(dataParametersMap.getOrDefault("drainage_l", null));
            Integer drainageR = MapUtil.castToInteger(dataParametersMap.getOrDefault("drainage_r", null));
            Double height = MapUtil.castToDouble(dataParametersMap.getOrDefault("height", null));

            object = tprRecord.queryTPRRecordDataByPrimaryKeys(chartNo, serno, assessDate, assessTime);

            // check record exists
            if (object.isEmpty()) {
                List<Object> inputObjects = Arrays.asList(
                        chartNo, serno, assessDate, assessTime, temperature, systolicPressure,
                        diastolicPressure, pulse, respiration, weight, ivFluids, urine,
                        stool, bleed, amnioticFluid, drainageL, drainageR, height,
                        keyinClerk, keyinDate, keyinTime);

                Map<String, Object> map = tprRecord.insertTPRRecord(inputObjects);

                // check insert success
                if (!map.isEmpty()) {
                    resultString = "Insert " + castToInt(map.get("count")) + " record. chart_no=" + chartNo + " serno=" + serno + " assess_date=" + assessDate + " assess_time=" + assessTime;
                    jsonObject = MapUtil.getSuccessResult(resultString);
                } else {
                    resultString = "TPRRecord.insertTPRRecord Failed.  inputObjects: " + inputObjects.toString();
                    jsonObject = MapUtil.getFailureResult(resultString);
                }
            } else {
                resultString = "Insert record exists. chart_no=" + chartNo + " serno=" + serno + " assess_date=" + assessDate + " assess_time=" + assessTime;
                jsonObject = MapUtil.getFailureResult(resultString);
            }
        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }
        return jsonObject.toString();

    }

    public String updateTPRRecordByPrimaryKeys(Map<String, Object> dataParametersMap) {
        try {
            Integer chartNo = MapUtil.castToInteger(dataParametersMap.getOrDefault("chart_no", null));
            Integer serno = MapUtil.castToInteger(dataParametersMap.getOrDefault("serno", null));
            String assessDate = MapUtil.castToStr(dataParametersMap.getOrDefault("assess_date", null));
            String assessTime = MapUtil.castToStr(dataParametersMap.getOrDefault("assess_time", null));
            Double temperature = MapUtil.castToDouble(dataParametersMap.getOrDefault("temperature", null));
            Integer systolicPressure = MapUtil.castToInteger(dataParametersMap.getOrDefault("systolic_pressure", null));
            Integer diastolicPressure = MapUtil.castToInteger(dataParametersMap.getOrDefault("diastolic_pressure", null));
            Integer pulse = MapUtil.castToInteger(dataParametersMap.getOrDefault("pulse", null));
            Integer respiration = MapUtil.castToInteger(dataParametersMap.getOrDefault("respiration", null));
            Double weight = MapUtil.castToDouble(dataParametersMap.getOrDefault("weight", null));
            Integer ivFluids = MapUtil.castToInteger(dataParametersMap.getOrDefault("iv_fluids", null));
            Integer urine = MapUtil.castToInteger(dataParametersMap.getOrDefault("urine", null));
            String stool = MapUtil.castToStr(dataParametersMap.getOrDefault("stool", null));
            Integer bleed = MapUtil.castToInteger(dataParametersMap.getOrDefault("bleed", null));
            Integer amnioticFluid = MapUtil.castToInteger(dataParametersMap.getOrDefault("amniotic_fluid", null));
            Integer drainageL = MapUtil.castToInteger(dataParametersMap.getOrDefault("drainage_l", null));
            Integer drainageR = MapUtil.castToInteger(dataParametersMap.getOrDefault("drainage_r", null));
            Double height = MapUtil.castToDouble(dataParametersMap.getOrDefault("height", null));

            String modifyClerk = MapUtil.castToStr(dataParametersMap.getOrDefault("modify_clerk", null));
            String modifyDate = MapUtil.castToStr(dataParametersMap.getOrDefault("modify_date", null));
            String modifyTime = MapUtil.castToStr(dataParametersMap.getOrDefault("modify_time", null));

            object = tprRecord.queryTPRRecordDataByPrimaryKeys(chartNo, serno, assessDate, assessTime);

            // check record exists
            if (!object.isEmpty()) {
                List<Object> inputObjects = Arrays.asList(
                        temperature, systolicPressure, diastolicPressure, pulse, respiration, weight,
                        ivFluids, urine, stool, bleed, amnioticFluid, drainageL, drainageR, height,
                        modifyClerk, modifyDate, modifyTime,
                        chartNo, serno, assessDate, assessTime);
                Map<String, Object> map = tprRecord.updateTPRRecordByPrimaryKeys(inputObjects);

                // check update success
                if (!map.isEmpty()) {
                    resultString = "Update " + castToInt(map.get("count")) + " record. chart_no=" + chartNo +
                            " serno=" + serno + " assess_date=" + assessDate + " assess_time=" + assessTime;
                    jsonObject = MapUtil.getSuccessResult(resultString);
                } else {
                    resultString = "TPRRecord.updateTPRRecordByPrimaryKeys Failed. inputObjects: " + inputObjects.toString();
                    jsonObject = MapUtil.getFailureResult(resultString);
                }
            } else {
                resultString = "Update record not exists. chart_no=" + chartNo + " serno=" + serno +
                        " assess_date=" + assessDate + " assess_time=" + assessTime;
                jsonObject = MapUtil.getFailureResult(resultString);
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }
        return jsonObject.toString();

    }

    public String deleteTPRRecordByPrimaryKeys(Map<String, Object> dataParametersMap) {
        try {
            Integer chartNo = MapUtil.castToInteger(dataParametersMap.getOrDefault("chart_no", null));
            Integer serno = MapUtil.castToInteger(dataParametersMap.getOrDefault("serno", null));
            String assessDate = MapUtil.castToStr(dataParametersMap.getOrDefault("assess_date", null));
            String assessTime = MapUtil.castToStr(dataParametersMap.getOrDefault("assess_time", null));

            object = tprRecord.queryTPRRecordDataByPrimaryKeys(chartNo, serno, assessDate, assessTime);

            // check record exists
            if (!object.isEmpty()) {
                List<Object> inputObjects = Arrays.asList(chartNo, serno, assessDate, assessTime);
                Map<String, Object> map = tprRecord.deleteTPRRecordByPrimaryKeys(inputObjects);

                // check delete success
                if (!map.isEmpty()) {
                    resultString = "Delete " + castToInt(map.get("count")) + " record. chart_no=" + chartNo + " serno=" + serno + " assess_date=" + assessDate + " assess_time=" + assessTime;
                    jsonObject = MapUtil.getSuccessResult(resultString);
                } else {
                    resultString = "TPRRecord.deleteTPRRecordByPrimaryKeys Failed. inputObjects: " + inputObjects.toString();
                    jsonObject = MapUtil.getFailureResult(resultString);
                }

            } else {
                resultString = "Delete record not exists. chart_no=" + chartNo + " serno=" + serno + " assess_date=" + assessDate + " assess_time=" + assessTime;
                jsonObject = MapUtil.getFailureResult(resultString);
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
        int chartNo;
        int serno;
        JsonObject dataParametersJsObj;
        Map<String, Object> dataParametersMap;

        try {
            myConnection = jdbcUtil.getConnection();
            tableUtil = new TableUtil(myConnection);
            tprRecord = new TPRRecord(myConnection);

            String method = parametersJsObj.get("method").getAsString();

            if (method.equals("insertTPRRecord")) {
                dataParametersJsObj = parametersJsObj.get("dataParameters").getAsJsonObject();
                dataParametersMap = MapUtil.jsonObjectToMap(dataParametersJsObj);
                String checkMessages = "";

                this.getTableConstrains("tprrecord", tableUtil);

                noNullColNames.add("keyin_clerk");  // keyin_clerk column check
                checkMessages = checkMessages
                        + tableUtil.checkPKColsMissing(pkColNames, dataParametersMap) + " "
                        + tableUtil.checkNoNullColsMissing(noNullColNames, dataParametersMap) + " "
                        + tableUtil.checkValueConstrains(tableMetaData, dataParametersMap);

//                System.out.println(checkMessages.trim().isEmpty()
//                        ? "checkPKColsMissing & checkNoNullColsMissing & dataCheck.checkValueConstrains Passed"
//                        : "checkMessage: " + checkMessages);

                if (checkMessages.trim().isEmpty()) {
                    String rocDateTimeString = DateUtil.dateTimeToROCDateTimeString(DateUtil.getSystemDateTime(myConnection).toLocalDateTime());
                    dataParametersMap.put("keyin_date", rocDateTimeString.split(" ")[0]);
                    dataParametersMap.put("keyin_time", (rocDateTimeString.split(" ")[1]).substring(0, 4));
                    result = insertTPRRecord(dataParametersMap);
                } else {
                    result = MapUtil.getFailureResult(checkMessages).toString();
                }
            }

            if (method.equals("updateTPRRecordByPrimaryKeys")) {
                dataParametersJsObj = parametersJsObj.get("dataParameters").getAsJsonObject();
                dataParametersMap = MapUtil.jsonObjectToMap(dataParametersJsObj);
                String checkMessages = "";

                this.getTableConstrains("tprrecord", tableUtil);

                noNullColNames.add("modify_clerk"); // modify_clerk column check
                checkMessages = checkMessages
                        + tableUtil.checkPKColsMissing(pkColNames, dataParametersMap) + " "
                        + tableUtil.checkNoNullColsMissing(noNullColNames, dataParametersMap) + " "
                        + tableUtil.checkValueConstrains(tableMetaData, dataParametersMap);

//                System.out.println(checkMessages.trim().isEmpty()
//                        ? "checkPKColsMissing & checkNoNullColsMissing & dataCheck.checkValueConstrains Passed"
//                        : "checkMessage: " + checkMessages);

                if (checkMessages.trim().isEmpty()) {
                    String rocDateTimeString = DateUtil.dateTimeToROCDateTimeString(DateUtil.getSystemDateTime(myConnection).toLocalDateTime());
                    dataParametersMap.put("modify_date", rocDateTimeString.split(" ")[0]);
                    dataParametersMap.put("modify_time", (rocDateTimeString.split(" ")[1]).substring(0, 4));
                    result = updateTPRRecordByPrimaryKeys(dataParametersMap);
                } else {
                    result = MapUtil.getFailureResult(checkMessages).toString();
                }
            }

            if (method.equals("deleteTPRRecordByPrimaryKeys")) {
                dataParametersJsObj = parametersJsObj.get("dataParameters").getAsJsonObject();
                dataParametersMap = MapUtil.jsonObjectToMap(dataParametersJsObj);

                String checkMessages = "";

                this.getTableConstrains("tprrecord", tableUtil);

                checkMessages = checkMessages
                        + tableUtil.checkPKColsMissing(pkColNames, dataParametersMap) + " "
                        //+ tableUtil.checkNoNullColsMissing(noNullColNames, dataParametersMap) + " " // check table's noNull cols
                        + tableUtil.checkValueConstrains(tableMetaData, dataParametersMap);

//                System.out.println(checkMessages.trim().isEmpty()
//                        ? "checkPKColsMissing & checkNoNullColsMissing & dataCheck.checkValueConstrains Passed"
//                        : "checkMessage: " + checkMessages);

                if (checkMessages.trim().isEmpty()) {
                    result = deleteTPRRecordByPrimaryKeys(dataParametersMap);
                } else {
                    result = MapUtil.getFailureResult(checkMessages).toString();
                }
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
        JsonObject dataJsonObject = new JsonObject();
        //Map<String, String> map = new LinkedHashMap<>();
        TPRRecordMADService tprRecordMADService = new TPRRecordMADService();
        String resultStrng;


        Integer chartNo = 158689;
        Integer serno = 133162;
        String assessDate = "1070515";
        String assessTime = "1615";
        Double temperature = 37.0;
        Integer systolicPressure = 120;
        Integer diastolicPressure = 70;
        Integer pulse = 68;
        Integer respiration = 18;
        Double weight = 78.2;
        Integer ivFluids = 200;
        Integer urine = 100;
        String stool = "1A";
        Integer bleed = 100;
        Integer amnioticFluid = 200;
        Integer drainageL = 100;
        Integer drainageR = 100;
        Double height = 165.2;

        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        dataJsonObject.addProperty("chart_no", chartNo);
        dataJsonObject.addProperty("serno", serno);
        dataJsonObject.addProperty("assess_date", assessDate);
        dataJsonObject.addProperty("assess_time", assessTime);
        dataJsonObject.addProperty("temperature", temperature);
        dataJsonObject.addProperty("systolic_pressure", systolicPressure);
        dataJsonObject.addProperty("diastolic_pressure", diastolicPressure);
        dataJsonObject.addProperty("pulse", pulse);
        dataJsonObject.addProperty("respiration", respiration);
        dataJsonObject.addProperty("weight", weight);
        dataJsonObject.addProperty("iv_fluids", ivFluids);
        dataJsonObject.addProperty("urine", urine);
        dataJsonObject.addProperty("stool", stool);
        dataJsonObject.addProperty("bleed", bleed);
        dataJsonObject.addProperty("amniotic_fluid", amnioticFluid);
        dataJsonObject.addProperty("drainage_l", drainageL);
        dataJsonObject.addProperty("drainage_r", drainageR);
        dataJsonObject.addProperty("height", height);
        dataJsonObject.addProperty("keyin_clerk", "ORCL");
        jsonObject.add("dataParameters", dataJsonObject);
        jsonObject.addProperty("method", "insertTPRRecord");
        resultStrng = tprRecordMADService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nTPRRecordMADService.run insertTPRRecord chartNo=" + chartNo + " serno=" + serno +
                " assessDate=" + assessDate  + " assessTime= " + assessTime + " : " + resultStrng);

        jsonObject = new JsonObject();
        dataJsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        dataJsonObject.addProperty("chart_no", chartNo);
        dataJsonObject.addProperty("serno", serno);
        dataJsonObject.addProperty("assess_date", assessDate);
        dataJsonObject.addProperty("assess_time", assessTime);
        dataJsonObject.addProperty("temperature", temperature);
        dataJsonObject.addProperty("systolic_pressure", systolicPressure);
        dataJsonObject.addProperty("diastolic_pressure", diastolicPressure);
        dataJsonObject.addProperty("pulse", pulse);
        dataJsonObject.addProperty("respiration", respiration);
        dataJsonObject.addProperty("weight", weight);
        dataJsonObject.addProperty("iv_fluids", ivFluids);
        dataJsonObject.addProperty("urine", urine);
        dataJsonObject.addProperty("stool", stool);
        dataJsonObject.addProperty("bleed", bleed);
        dataJsonObject.addProperty("amniotic_fluid", amnioticFluid);
        dataJsonObject.addProperty("drainage_l", drainageL);
        dataJsonObject.addProperty("drainage_r", drainageR);
        dataJsonObject.addProperty("height", height);
        dataJsonObject.addProperty("modify_clerk", "ORCL");
        jsonObject.add("dataParameters", dataJsonObject);
        jsonObject.addProperty("method", "updateTPRRecordByPrimaryKeys");
        resultStrng = tprRecordMADService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nTPRRecordMADService.run updateTPRRecordByPrimaryKeys chartNo=" + chartNo + " serno=" + serno +
                " assessDate=" + assessDate  + " assessTime= " + assessTime + " : " + resultStrng);

        jsonObject = new JsonObject();
        dataJsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        dataJsonObject.addProperty("chart_no", chartNo);
        dataJsonObject.addProperty("serno", serno);
        dataJsonObject.addProperty("assess_date", assessDate);
        dataJsonObject.addProperty("assess_time", assessTime);
        jsonObject.add("dataParameters", dataJsonObject);
        jsonObject.addProperty("method", "deleteTPRRecordByPrimaryKeys");
//        resultStrng = tprRecordMADService.run(jsonObject);
//        System.out.println("\nParameters JsonObject string: " + jsonObject);
//        System.out.println("\nTPRRecordMADService.run deleteTPRRecordByPrimaryKeys chartNo=" + chartNo + " serno=" + serno +
//                " assessDate=" + assessDate  + " assessTime= " + assessTime + " : " + resultStrng);

    }
}
