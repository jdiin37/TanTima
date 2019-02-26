package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

/**
 * Created by jeffy on 2018/5/11.
 */
public class OutNote {
    private Connection con;

    public OutNote(Connection con) {
        this.con = con;
    }

    public Map<String, Object> queryOutnoteByPrimaryKeys(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, a.ckin_date, a.discharge_date, a.inout_day, " +
                "       a.div_no, (SELECT b.div_name FROM division b WHERE b.div_no = a.div_no) div_name, " +
                "       a.bed_no, a.in_diagnosis, a.out_diagnosis, a.trans_in, b.hosp_name, a.cc, " +
                "       a.ph, a.pe, a.or_desc, a.treatment, a.complication, a.general_lab, " +
                "       a.special_lab, a.xray_rep, a.pathologic_rep, a.other, a.out_status, a.out_directory, " +
                "       a.keyin_clerk, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.keyin_clerk) keyin_clerk_name, " +
                "       a.keyin_date, a.keyin_time, a.printed_flag, a.finished_flag, a.finished_flag_r, " +
                "       a.ckin_date_f, a.vs_complete_date, a.r_complete_date, a.begin_date, a.end_date, " +
                "       a.vs, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.vs) vs_name, " +
                "       a.r, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.r) r_name, " +
                "       c.source  " +
                "  FROM outnote a, hospital b, patinp c " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = ? " +
                "   AND a.trans_in = b.hosp_no(+)  " +
                "   AND (a.chart_no = c.chart_no(+) AND a.serno = c.serno(+)) ";

        EntityFactory outnoteEntity = new EntityFactory(con, queryString);
        return outnoteEntity.findSingle(new Object[]{chartNo, serno});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            OutNote outNote = new OutNote(myConnection);

            System.out.println("\nOutNote.queryOutnoteByPrimaryKeys chartNo=170869 serno=147390 JsonObject: " +
                    MapUtil.mapToJsonObject(outNote.queryOutnoteByPrimaryKeys(74881, 133200)));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}
