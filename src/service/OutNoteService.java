package service;

import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import model.OutNote;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/5/11.
 */
public class OutNoteService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private OutNote outNote;

    public String getOutNoteDataByPrimaryKeys(int chartNo, int serno) {
        try {
            object = outNote.queryOutnoteByPrimaryKeys(chartNo, serno);

            if (!object.isEmpty()) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.mapToJsonObject(object));
            } else {
                jsonObject = MapUtil.getFailureResult("OutNote.queryOutnoteByPrimaryKeys chartNo= " + chartNo +
                        " serno= " + serno + " No Data Found ");
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
            outNote = new OutNote(myConnection);
            
            String empNo = parametersJsObj.get("empNo").getAsString();
            String method = parametersJsObj.get("method").getAsString();

            //  get outnote data by primary keys => {chart_no, serno}
            if (method.equals("getOutNoteDataByPrimaryKeys")) {
                int chartNo = parametersJsObj.get("chartNo").getAsInt();
                int serno = parametersJsObj.get("serno").getAsInt();
                result = getOutNoteDataByPrimaryKeys(chartNo, serno);
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
        OutNoteService outNoteService = new OutNoteService();
        String resultStrng;

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 1);
        jsonObject.addProperty("chartNo", 74881);
        jsonObject.addProperty("serno", 133200);
        jsonObject.addProperty("method", "getOutNoteDataByPrimaryKeys");
        resultStrng = outNoteService.run(jsonObject);
        System.out.println("\nParameters JsonObject string: " + jsonObject);
        System.out.println("\nOutNoteService.run getOutNoteDataByPrimaryKeys chartNo=923833 serno=94771 :"  + resultStrng);

    }
}
