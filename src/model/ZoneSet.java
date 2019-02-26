package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


/**
 * Created by jeffy on 2018/4/24.
 */
public class ZoneSet {
    private Connection con;

    public ZoneSet(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryZoneSet() throws SQLException {
        String queryString =
                "SELECT a.zone, a.zone_name, a.hosp_no " +
                "  FROM zoneset a " +
                " WHERE a.zone != 'X' " +
                " ORDER BY a.zone ";

        EntityFactory zoneSetEntity = new EntityFactory(con, queryString);
        return zoneSetEntity.findMultiple(new Object[]{});
    }

    public Map<String, Object> queryZoneSetByZone(String zone) throws SQLException {

        String queryString =
                "SELECT a.zone, a.zone_name, a.hosp_no " +
                "  FROM zoneset a " +
                " WHERE a.zone != 'X' " +
                "   AND a.zone = ? " +
                " ORDER BY a.zone ";

        EntityFactory zoneSetEntity = new EntityFactory(con, queryString);
        return zoneSetEntity.findSingle(new Object[]{zone});
    }

    public String getZoneName(String zone) {
        String zoneName = null;
        try {
            zoneName = (String)queryZoneSetByZone(zone).get("zone_name");
        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        }
        return zoneName;
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            ZoneSet zoneSet = new ZoneSet(myConnection);

            System.out.println("\nZoneSet.queryZoneSet JsonArray: " +
                    MapUtil.listMapToJsonArray(zoneSet.queryZoneSet()));

            System.out.println("\nZoneSet.queryZoneSetByZone zone='A' JsonObjet: " +
                    MapUtil.mapToJsonObject(zoneSet.queryZoneSetByZone("A")));

            System.out.println("\nZoneSet.getZoneName zone='A' String: " + zoneSet.getZoneName("A"));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }

}

