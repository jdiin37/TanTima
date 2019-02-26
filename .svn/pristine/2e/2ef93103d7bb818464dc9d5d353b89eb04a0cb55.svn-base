package service;


import abstracts.ServletAdapter;
import com.google.gson.JsonObject;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;
import model.ZoneSet;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/4/24.
 */
public class ZoneSetService extends ServletAdapter {
    private List<Map<String, Object>> objects;
    private Map<String, Object> object;
    private JsonObject jsonObject = new JsonObject();
    private ZoneSet zoneSet;

    public String getZonSet() {
        try {
            objects = zoneSet.queryZoneSet();

            if (objects.size() > 0) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.listMapToJsonArray(objects));
            } else {
                jsonObject = MapUtil.getFailureResult("ZoneSet.queryZoneSet No Data Found ");
            }

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
            jsonObject = MapUtil.getFailureResult(ex.getMessage());
        }

        return jsonObject.toString();
    }

    public String getZonSetByZone(String zone) {
        try {
            object = zoneSet.queryZoneSetByZone(zone);

            if (object.size() > 0) {
                jsonObject = MapUtil.getSuccessResult(MapUtil.mapToJsonObject(object));
            } else {
                jsonObject = MapUtil.getFailureResult("ZoneSet.queryZoneSetByZone zone= " + zone + " No Data Found ");
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
            zoneSet = new ZoneSet(myConnection);
            String method = parametersJsObj.get("method").getAsString();

            //  get zone set data
            if (method.equals("getZonSet")) {
                result = getZonSet();
            }

            // get zone set by zone no
            if (method.equals("getZonSetByZone")) {
                String zone = parametersJsObj.get("zone").getAsString();
                result = getZonSetByZone(zone);
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
        ZoneSetService zoneSetService = new ZoneSetService();
        String resultStrng;

        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 3690);
        jsonObject.addProperty("method", "getZonSet");
        System.out.println("Parameters JsonObject string: " + jsonObject);
        resultStrng = zoneSetService.run(jsonObject);
        System.out.println("ZoneSetService.run getZonSet: " + resultStrng);

        jsonObject = new JsonObject();
        jsonObject.addProperty("empNo", "ORCL");
        jsonObject.addProperty("sessionID", 3690);
        jsonObject.addProperty("zone", "A");
        jsonObject.addProperty("method", "getZonSetByZone");
        System.out.println("Parameters JsonObject string: " + jsonObject);
        resultStrng = zoneSetService.run(jsonObject);
        System.out.println("ZoneSetService.run getZonSetByZone: zone=A " + resultStrng);
    }
}
