package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by jeffy on 2018/5/7.
 */
public class Admit {
    private Connection con;

    public Admit(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> querylinkedAdmitDataByChartNoSerno(int chartNo, int serno) throws SQLException {        
        String queryString =
                "SELECT a.chart_no, a.serno, a.link_serno, b.pt_name, a.ckin_date, a.ckin_time, a.discharge_date, " +
                "       a.discharge_time, a.pt_type, a.div_no, a.vs, a.emg_days, a.chronic_days " +
                "  FROM admit a, chart b " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno <= ? " +
                "   AND a.chart_no = b.chart_no(+) " +
                " ORDER BY a.ckin_date desc";

        EntityFactory admitEntity = new EntityFactory(con, queryString);
        return admitEntity.findMultiple(new Object[]{chartNo, serno});
    }

    public Map<String, Object> queryPreAdmitDataByChartNoSerno(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, a.link_serno, b.pt_name, a.ckin_date, a.ckin_time, " +
                "       a.discharge_date, a.discharge_time, a.pt_type, a.div_no, a.vs, a.emg_days, " +
                "       a.chronic_days " +
                "  FROM admit a, chart b " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = (SELECT MAX(serno) FROM admit WHERE chart_no = ? AND serno < ? ) " +
                "   AND a.chart_no = b.chart_no(+)  " +
                "ORDER BY a.ckin_date desc ";

        EntityFactory admitEntity = new EntityFactory(con, queryString);
        return admitEntity.findSingle(new Object[]{chartNo, chartNo, serno});
    }

    public Map<String, Object> queryAdmitDataByChartNoSerno(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, a.link_serno, b.pt_name, a.ckin_date, a.ckin_time, a.discharge_date, " +
                "       a.discharge_time, a.pt_type, a.div_no, a.vs, a.emg_days, a.chronic_days " +
                "  FROM admit a, chart b " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = ? " +
                "   AND a.chart_no = b.chart_no(+) " +
                " ORDER BY a.ckin_date desc";

        EntityFactory admitEntity = new EntityFactory(con, queryString);
        return admitEntity.findSingle(new Object[]{chartNo, serno});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            Admit admit = new Admit(myConnection);

            int chartNo = 176221;
            int serno = 142866;

            System.out.printf("\nAdmit.querylinkedAdmitDataByChartNoSerno chartNo=%d serno=%d JsonArray: %s ",
                    chartNo, serno, MapUtil.listMapToJsonArray(admit.querylinkedAdmitDataByChartNoSerno(chartNo, serno)));

            System.out.printf("\nAdmit.queryPreAdmitDataByChartNoSerno chartNo=%d serno=%d JsonObject: %s ",
                    chartNo, serno, MapUtil.mapToJsonObject(admit.queryPreAdmitDataByChartNoSerno(chartNo, serno)));

            System.out.printf("\nAdmit.queryAdmitDataByChartNoSerno chartNo=%d serno=%d JsonObject: %s ",
                    chartNo, serno, MapUtil.mapToJsonObject(admit.queryAdmitDataByChartNoSerno(chartNo, serno)));


        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

