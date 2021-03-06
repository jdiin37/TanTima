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
public class Patinp {
    private Connection con;

    public Patinp(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryPatinpListInp() throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, b.pt_name, b.birth_date, 0 age, b.sex, " +
                "       CASE WHEN b.sex = 1 THEN '男' WHEN b.sex = 2 THEN '女' ELSE '未知' END AS sex_name, " +
                "       a.pt_type, a.bed_no, '' he_bed_no, c.ns, d.dept_name ns_name, a.ckin_date, a.ckin_time, " +
                "       a.vs, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.vs) vs_name, " +
                "       a.cr, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.cr) cr_name, " +
                "       a.r, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.r) r_name, " +
                "       a.div_no, (SELECT b.div_name FROM division b WHERE b.div_no = a.div_no) div_name, " +
                "       a.card_seq, a.part_no, a.pt_type, e.price_type, e.type_name, " +
                "       a.baby_chart_no, a.source, a.comefrom_no, a.drg_code, a.discharge_reason, " +
                "       a.discharge_date, a.discharge_time, a.emg_days, a.chronic_days, a.part_no, a.card_seq, " +
                "       a.trans_in, a.part_amt, a.brain_flag, a.link_serno, a.display_flag, a.status, " +
                "       a.close_acnt_date, a.link_confirm_flag, 0 admit_days, " +
                "       'N' is_ctrl, 'N' in14days, 'N' over30days, 'N' is_uri, NULL uri_msg  " +
                "  FROM patinp a, chart b, bed c, department d, pttype e " +
                " WHERE (    a.discharge_date IS NULL  " +
                "        OR (a.discharge_date IS NOT NULL AND a.discharge_reason IS NULL) " +
                "       )  " +
                "   AND a.status <> '0' " +
                "   AND a.chart_no = b.chart_no(+) " +
                "   AND a.bed_no = c.bed_no(+) " +
                "   AND c.ns = d.dept_no(+) " +
                "   AND a.pt_type = e.pt_type(+) " +
                "ORDER BY bed_no ";

        EntityFactory patinpEntity = new EntityFactory(con, queryString);
        return patinpEntity.findMultiple(new Object[]{});
    }

    public List<Map<String, Object>> queryPatinpListByChartNo(int chartNo) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, b.pt_name, b.birth_date, 0 age, b.sex, " +
                "       CASE WHEN b.sex = 1 THEN '男' WHEN b.sex = 2 THEN '女' ELSE '未知' END AS sex_name, " +
                "       a.pt_type, a.bed_no, '' he_bed_no, c.ns, d.dept_name ns_name, a.ckin_date, a.ckin_time, " +
                "       a.vs, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.vs) vs_name, " +
                "       a.cr, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.cr) cr_name, " +
                "       a.r, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.r) r_name, " +
                "       a.div_no, (SELECT b.div_name FROM division b WHERE b.div_no = a.div_no) div_name, " +
                "       a.card_seq, a.part_no, a.pt_type, e.price_type, e.type_name, " +
                "       a.baby_chart_no, a.source, a.comefrom_no, a.drg_code, a.discharge_reason, " +
                "       a.discharge_date, a.discharge_time, a.emg_days, a.chronic_days, a.part_no, a.card_seq, " +
                "       a.trans_in, a.part_amt, a.brain_flag, a.link_serno, a.display_flag, a.status, " +
                "       a.close_acnt_date, a.link_confirm_flag, 0 admit_days, " +
                "       'N' is_ctrl, 'N' in14days, 'N' over30days, 'N' is_uri, NULL uri_msg " +
                "  FROM patinp a, chart b, bed c, department d, pttype e " +
                " WHERE a.chart_no = ? " +
                "   AND a.status <> '0' " +
                "   AND a.chart_no = b.chart_no(+) " +
                "   AND a.bed_no = c.bed_no(+) " +
                "   AND c.ns = d.dept_no(+) " +
                "   AND a.pt_type = e.pt_type(+) " +
                "ORDER BY bed_no ";

        EntityFactory patinpEntity = new EntityFactory(con, queryString);
        return patinpEntity.findMultiple(new Object[]{chartNo});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            Patinp patinp = new Patinp(myConnection);

            System.out.printf("\nPatinp.queryPatinpListInp JsonArray:%s ",
                    MapUtil.listMapToJsonArray(patinp.queryPatinpListInp()).toString());

            int chartNo = 170869;
            System.out.printf("\nPatinp.queryPatinpListByChartNo chartNo=%d JsonArray:%s  ",
                    chartNo, MapUtil.listMapToJsonArray(patinp.queryPatinpListByChartNo(chartNo)).toString());

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

