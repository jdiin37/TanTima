package service;

import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import model.NoteSampleNur;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/7/27.
 */
public class NoteSampleNurService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private NoteSampleNur noteSampleNur;

    public String getEmpListFromNoteSampleNur() {
        try {
            objects = noteSampleNur.queryEmpListFromNoteSampleNur();

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("NoteSampleNur.queryEmpListFromNoteSampleNur No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    public String getNoteSampleNurByEmpNo(String noteEmpNo) {
        try {
            objects = noteSampleNur.queryNoteSampleNurByEmpNo(noteEmpNo);

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("NoteSampleNur.queryNoteSampleNurByEmpNo noteEmpNo=" + noteEmpNo + " No Data Found ");
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
            noteSampleNur = new NoteSampleNur(myConnection);

            String empNo = parametersJsObj.get("empNo").getAsString();
            String method = parametersJsObj.get("method").getAsString();

            //  get emp list from noteSample_nur
            if (method.equals("getEmpListFromNoteSampleNur")) {
                result = getEmpListFromNoteSampleNur();
            }

            // get data from noteSample_Nur by emp_no
            if (method.equals("getNoteSampleNurByEmpNo")) {
                String noteEmpNo = parametersJsObj.get("noteEmpNo").getAsString();
                result = getNoteSampleNurByEmpNo(noteEmpNo);
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
        return result;
    }


    public static void main(String[] args) {
        JsonObject jsonObject = new JsonObject();
        //Map<String, String> map = new LinkedHashMap<>();
        NoteSampleNurService noteSampleNurService = new NoteSampleNurService();
        String resultStrng;

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("method", "getEmpListFromNoteSampleNur");
        resultStrng = noteSampleNurService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nNoteSampleNurService.run getEmpListFromNoteSampleNur :" + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("noteEmpNo", "ORCL");
        jsonObject.addProperty("method", "getNoteSampleNurByEmpNo");
        resultStrng = noteSampleNurService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nNoteSampleNurService.run getNoteSampleNurByEmpNo noteEmpNo='ORCL' :" + resultStrng);

    }
}
