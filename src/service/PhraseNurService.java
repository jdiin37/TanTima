package service;

import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import model.NoteSampleNur;
import model.PhraseNur;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/7/27.
 */
public class PhraseNurService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private PhraseNur phraseNur;

    public String getTypeListFromPhraseNurByEmpNo(String phraseEmpNo) {
        try {
            objects = phraseNur.queryTypeListFromPhraseNurByEmpNo(phraseEmpNo);

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("PhraseNur.queryTypeListFromPhraseNurByEmpNo empNo='" + phraseEmpNo + "' No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    public String getPhraseNurByEmpNoType(String phraseEmpNo, String type) {
        try {
            objects = phraseNur.queryPhraseNurByEmpNoType(phraseEmpNo, type);

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("PhraseNur.queryPhraseNurByEmpNoType"
                        + " empNo='" + phraseEmpNo + "' type='" + type + "' No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    public String getQuestionTxtFromPhraseNur() {
        try {
            objects = phraseNur.queryQuestionTxtFromPhraseNur();

            if (!objects.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("PhraseNur.queryQuestionTxtFromPhraseNur No Data Found ");
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
            phraseNur = new PhraseNur(myConnection);

            String empNo = parametersJsObj.get("empNo").getAsString();
            String method = parametersJsObj.get("method").getAsString();

            //  get type list from phrase_nur by emp_no
            if (method.equals("getTypeListFromPhraseNurByEmpNo")) {
                String phraseEmpNo = parametersJsObj.get("phraseEmpNo").getAsString();
                result = getTypeListFromPhraseNurByEmpNo(phraseEmpNo);
            }

            // get data from phrase_nur by emp_no, type
            if (method.equals("getPhraseNurByEmpNoType")) {
                String phraseEmpNo = parametersJsObj.get("phraseEmpNo").getAsString();
                String type = parametersJsObj.get("type").getAsString();
                result = getPhraseNurByEmpNoType(phraseEmpNo, type);
            }

            // get question txt from phrase_nur
            if (method.equals("getQuestionTxtFromPhraseNur")) {
                result = getQuestionTxtFromPhraseNur();
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
        PhraseNurService phraseNurService = new PhraseNurService();
        String resultStrng;

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("phraseEmpNo", "ORCL");
        jsonObject.addProperty("method", "getTypeListFromPhraseNurByEmpNo");
        resultStrng = phraseNurService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nPhraseNurService.run getTypeListFromPhraseNurByEmpNo :" + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("phraseEmpNo", "ORCL");
        jsonObject.addProperty("type", "A");
        jsonObject.addProperty("method", "getPhraseNurByEmpNoType");
        resultStrng = phraseNurService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nPhraseNurService.run getPhraseNurByEmpNoType empNo='ORCL' type='A' :" + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("method", "getQuestionTxtFromPhraseNur");
        resultStrng = phraseNurService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nPhraseNurService.run getQuestionTxtFromPhraseNur :" + resultStrng);


    }
}
