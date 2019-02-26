package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static library.utility.MapUtil.castToStr;

/**
 * Created by jeffy on 2018/5/14.
 * 2018/07/30 add insert, update, delete method
 */
public class NurseProgress {

    private Connection con;

    public NurseProgress(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryNurseProgressByChartNoSerno(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, a.progress_date, a.progress_time, " +
                "       a.order_dr, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.order_dr) doctor_name, " +
                "       a.focus_no, a.focus_txt, a.content_d, a.content_a, a.content_r, a.content_t,  " +
                "       a.end_date, a.end_time, a.stop_reason, a.memo, " +
                "       a.keyin_clerk, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.keyin_clerk) keyin_clerk_name " +
                "  FROM nurseprogress a " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = ? " +
                " ORDER BY a.progress_date desc, a.progress_time desc ";

        EntityFactory nurseProgressEntity = new EntityFactory(con, queryString);
        return nurseProgressEntity.findMultiple(new Object[]{chartNo, serno});
    }

    public Map<String, Object> queryNurseProgressDataByPrimaryKeys(int chartNo, int serno, String progressDate, String progressTime) throws SQLException {
        List<Map<String, Object>> nurProgressMapList = queryNurseProgressByChartNoSerno(chartNo, serno);
        Map<String, Object> resultMap = new LinkedHashMap<>();

        return nurProgressMapList.stream()
                .filter(map -> progressDate.equals(castToStr(map.get("progress_date")))
                        && progressTime.equals(castToStr(map.get("progress_time"))))
                .findAny().orElse(new LinkedHashMap<>());
    }

    public Map<String, Object> insertNurseProgress(List<Object> objects) throws SQLException {
        String insertString =
                "INSERT INTO nurseprogress ( " +
                "   chart_no, serno, progress_date, progress_time, order_dr, focus_no, " +
                "   focus_txt, content_d, content_a, content_r, content_t, end_date, " +
                "   end_time, stop_reason, memo, keyin_clerk) " +
                "VALUES ( ?, ?, ?, ?, ?, ?, " +
                "         ?, ?, ?, ?, ?, ?, " +
                "         ?, ?, ?, ?) ";

        EntityFactory nurseProgressEntity = new EntityFactory(con, insertString);
        return nurseProgressEntity.upsertSingle(objects);
    }

    public Map<String, Object> updateNurseProgressByPrimaryKeys(List<Object> objects) throws SQLException {
        String updateString =
                "UPDATE nurseprogress " +
                "       order_dr      = ? , " +
                "       focus_no      = ? , " +
                "       focus_txt     = ? , " +
                "       content_d     = ? , " +
                "       content_a     = ? , " +
                "       content_r     = ? , " +
                "       content_t     = ? , " +
                "       end_date      = ? , " +
                "       end_time      = ? , " +
                "       stop_reason   = ? , " +
                "       memo          = ? , " +
                "       keyin_clerk   = ?  " +
                " WHERE chart_no      = ? " +
                "   AND serno         = ? " +
                "   AND progress_date = ? " +
                "   AND progress_time = ? ";

        EntityFactory nurseProgressEntity = new EntityFactory(con, updateString);
        return nurseProgressEntity.upsertSingle(objects);
    }

    public Map<String, Object> deleteNurseProgressByPrimaryKeys(List<Object> objects) throws SQLException {
        String deleteString =
                "DELETE FROM nurseprogress " +
                " WHERE chart_no = ? " +
                "   AND serno = ? " +
                "   AND progress_date = ? " +
                "   AND progress_time = ? ";

        EntityFactory nurseProgressEntity = new EntityFactory(con, deleteString);
        return nurseProgressEntity.upsertSingle(objects);
    }

    public static void main(String[] args) {
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        Connection myConnection = null;
        String resultStrng = null;

        try {
            myConnection = jdbcUtil.getConnection();
            NurseProgress nurseProgress = new NurseProgress(myConnection);

            System.out.println("\nNurseProgress.queryNurseProgressByChartNoSerno chartNo=158689 serno=133162 JsonArray: " +
                    MapUtil.listMapToJsonArray(nurseProgress.queryNurseProgressByChartNoSerno(158689, 133162)));

            System.out.println("\nNurseProgress.queryNurseProgressDataByPrimaryKeys chartNo=158689 serno=133162 progressDate='1050329' progressTime='104250' JsonObject: " +
                    MapUtil.mapToJsonObject(nurseProgress.queryNurseProgressDataByPrimaryKeys(158689, 133162, "1050329", "104050")));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}
