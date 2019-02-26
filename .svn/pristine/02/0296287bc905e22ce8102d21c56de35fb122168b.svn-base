package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


/**
 * Created by jeffy on 2018/5/8.
 */
public class ChartCtl {
    private Connection con;

    public ChartCtl(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryChartCtlByChartNoCkinDate(int chartNo, String baseDate) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.start_date, a.seq_no, a.ctl_reason, a.ctl_reason1, " +
                "       a.ctl_reason2, a.ctl_reason3, a.apply_clerk, a.end_date " +
                "  FROM chartctl a " +
                " WHERE a.chart_no = ? " +
                "   AND a.start_date <= ? " +
                "   AND (a.end_date IS NULL OR a.end_date >= ? ) ";

        EntityFactory chartCtlEntity = new EntityFactory(con, queryString);
        return chartCtlEntity.findMultiple(new Object[]{chartNo, baseDate, baseDate});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();

        try {
            myConnection = jdbcUtil.getConnection();
            ChartCtl chartCtl = new ChartCtl(myConnection);

            int chartNo = 101603;
            String baseDate = "1051201";
            System.out.printf("\nChartCtl.queryChartCtlByChartNoCkinDate chartNo=%d ckinDate=%s JsonArray: %s ",
                    chartNo, baseDate, MapUtil.listMapToJsonArray(chartCtl.queryChartCtlByChartNoCkinDate(chartNo, baseDate)));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

