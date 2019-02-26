package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/7/27.
 */
public class NoteSampleNur {
    private Connection con;

    public NoteSampleNur(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryEmpListFromNoteSampleNur() throws SQLException {
        String queryString =
                "SELECT DISTINCT a.emp_no, b.emp_name   " +
                "  FROM notesample_nur a, employee b " +
                " WHERE a.emp_no = b.emp_no  " +
                "ORDER BY a.emp_no ";

        EntityFactory noteSampleEntity = new EntityFactory(con, queryString);
        return noteSampleEntity.findMultiple(new Object[]{});
    }

    public List<Map<String, Object>> queryNoteSampleNurByEmpNo(String noteEmpNo) throws SQLException {
        String queryString =
                "SELECT a.emp_no, a.kind_no, a.sample_d, a.sample_a, a.sample_r, a.sample_t " +
                "  FROM notesample_nur a " +
                " WHERE a.emp_no = ? " +
                "ORDER BY kind_no ";

        EntityFactory noteSampleEntity = new EntityFactory(con, queryString);
        return noteSampleEntity.findMultiple(new Object[]{noteEmpNo});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            NoteSampleNur noteSampleNur = new NoteSampleNur(myConnection);

            String empNo = "ORCL";

            System.out.printf("\nNoteSampleNur.queryEmpList JsonArray: %s ",
                    MapUtil.listMapToJsonArray(noteSampleNur.queryEmpListFromNoteSampleNur()));

            System.out.printf("\nNoteSampleNur.queryPreAdmitDataByChartNoSerno empNo=%s JsonArray: %s ",
                    empNo, MapUtil.listMapToJsonArray(noteSampleNur.queryNoteSampleNurByEmpNo(empNo)));


        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

