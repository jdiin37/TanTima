package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;


/**
 * Created by jeffy on 2018/5/7.
 */
public class Bed {
    private Connection con;

    public Bed(Connection con) {
        this.con = con;
    }

    public Map<String, Object> queryHeBedNoByBedNo(String bedNo) throws SQLException {
        String queryString =
                "SELECT a.bed_no, a.room_type, a.room, a.ns, a.add_flag, a.occupy_bed_no, a.he_bed_no " +
                "  FROM bed a " +
                " WHERE (a.bed_no = ? OR a.occupy_bed_no = ? ) " +
                "   AND a.he_bed_no IS NOT NULL ";

        EntityFactory bedEntity = new EntityFactory(con, queryString);
        return bedEntity.findSingle(new Object[]{bedNo, bedNo});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            Bed bed = new Bed(myConnection);

            String bedNo = "501";
            System.out.printf("\nBed.queryHeBedNoByBedNo bedNo=%s JsonObject: %s ",
                    bedNo, MapUtil.mapToJsonObject(bed.queryHeBedNoByBedNo(bedNo)));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

