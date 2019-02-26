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
public class Payment {
    private Connection con;

    public Payment(Connection con) {
        this.con = con;
    }

    public Map<String, Object> queryGuaranteeDepositByChartNoSerno(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT SUM(paid) guarantee_deposit " +
                "  FROM payment " +
                " WHERE chart_no = ? " +
                "   AND serno = ? " +
                "   AND paid_flag = '3' " + // 保證金
                "   AND (return_date IS NULL OR return_date = ' ') " +
                "   AND (scrap_date IS NULL OR scrap_date = ' ') ";

        EntityFactory paymentEntity = new EntityFactory(con, queryString);
        return paymentEntity.findSingle(new Object[]{chartNo, serno});
    }



    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            Payment chart = new Payment(myConnection);

            int chartNo = 175934;
            int serno = 148539;
            System.out.printf("\nPayment.queryGuaranteeDepositByChartNoSerno chartNo=%d serno=%d JsonObject: %s "
                    , chartNo, serno, MapUtil.mapToJsonObject(chart.queryGuaranteeDepositByChartNoSerno(chartNo, serno)));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}
