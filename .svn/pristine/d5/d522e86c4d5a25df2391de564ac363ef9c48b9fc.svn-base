package service;

import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.dateutility.DateComputeUtil;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import model.Patopd;
import model.XrayReport;
import model.Xrayord;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/4/27.
 */
public class XrayReportService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private XrayReport xrayReport;
    private Xrayord xrayord;
    private Patopd patopd;

    private Map<String, Object> getFirstAndLastViewDateByChartNo(int chartNo) {
        Map<String, Object> result = new LinkedHashMap<>();
        try {
            result = patopd.queryFirstAndLastViewDateByChartNo(chartNo);
        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        }
        return result;
    }

    public String getXrayReportByChartNoDateRange(int chartNo, String startDate, String endDate) {
        try {
            objects = xrayReport.queryXrayReportByChartNoDateRange(chartNo, startDate, endDate);

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("XrayReport.queryXrayReportByChartNoDateRange chartNo= " + chartNo +
                        " startDate= " + startDate + " endDate= " + endDate + " No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    public String getXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo(String xrayType, String inpOpd, String viewDate, int chartNo, int serno, int seqNo) {
        try {
            objects = xrayord.queryXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo(xrayType, inpOpd, viewDate, chartNo, serno, seqNo);

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("Xrayord.queryXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNO " +
                        " xray_type= " + xrayType + " inp_opd= " + inpOpd + " view_date= " + viewDate +
                        " chart_no= " + chartNo + " serno= " + serno + " seq_no= " + seqNo + " No Data Found ");
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
            xrayReport = new XrayReport(myConnection);
            xrayord = new Xrayord(myConnection);
            patopd = new Patopd(myConnection);
            String empNo = parametersJsObj.get("empNo").getAsString();
            String method = parametersJsObj.get("method").getAsString();

            //  get xray data by chartNo, startDate, endDate
            if (method.equals("getXrayReportByChartNoDateRange")) {
                int chartNo = parametersJsObj.get("chartNo").getAsInt();
                String range = parametersJsObj.get("range").getAsString();
                List<String> dateList = DateComputeUtil.getStartDateEndDate(range);
                result = getXrayReportByChartNoDateRange(chartNo, dateList.get(0), dateList.get(1));
            }

            // get xrayord by xray_type, inp_opd, view_date, chart_no, serno, seq_no
            if (method.equals("getXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo")) {
                String xrayType = parametersJsObj.get("xrayType").getAsString();
                String inpOpd = parametersJsObj.get("inpOpd").getAsString();
                String viewDate = parametersJsObj.get("viewDate").getAsString();
                int chartNo = parametersJsObj.get("chartNo").getAsInt();
                int serno = parametersJsObj.get("serno").getAsInt();
                int seqNo = parametersJsObj.get("seqNo").getAsInt();
                result = getXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo(xrayType, inpOpd, viewDate, chartNo, serno, seqNo);
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) { JDBCUtilities.closeConnection(myConnection); }
        }
        return result;
    }

    public static void main(String[] args) {
        JsonObject jsonObject;
        //Map<String, String> map = new LinkedHashMap<>();
        XrayReportService xrayReportService = new XrayReportService();
        String resultStrng;

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("chartNo", 74881);
        jsonObject.addProperty("range", "1000401|1051230");
        jsonObject.addProperty("method", "getXrayReportByChartNoDateRange");
        resultStrng = xrayReportService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nXrayReportService.run getXrayReportByChartNoDateRange chartNo=170869 range='1050607|1050620' JsonArray :"  + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("xrayType", "D");
        jsonObject.addProperty("inpOpd", "O");
        jsonObject.addProperty("viewDate", "1040803");
        jsonObject.addProperty("chartNo", 74881);
        jsonObject.addProperty("serno", 1);
        jsonObject.addProperty("seqNo", 139654);
        jsonObject.addProperty("method", "getXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo");
        resultStrng = xrayReportService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nXrayReportService.run getXrayordByXrayTypeInpOPdViewDateChartNoSerNoSeqNo " +
                "xrayType='D' inpOpd='O' viewDate='1040803' chartNo=74881 serno=1 seqNo=139654 :"  + resultStrng);

    }
}
