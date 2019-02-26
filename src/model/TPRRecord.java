package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static library.utility.MapUtil.castToStr;

/**
 * Created by jeffy on 2018/5/15.
 */
public class TPRRecord {
    private Connection con;

    public TPRRecord(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryTPRRecordByChartNoSerno(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, a.assess_date, a.assess_time, b.pt_name, " +
                "       (SELECT b.ckin_date FROM patinp b WHERE b.chart_no = a.chart_no AND b.serno = a.serno) ckin_date, " +
                "       (SELECT min(b.op_date) FROM or1 b WHERE b.chart_no = a.chart_no AND b.serno = a.serno AND b.op_date <= a.assess_date) op_date, " +
                "       a.temperature, a.systolic_pressure, a.diastolic_pressure, a.pulse, " +
                "       a.respiration, a.weight, a.iv_fluids, a.urine, a.stool, a.bleed, " +
                "       a.amniotic_fluid, a.drainage_l, a.drainage_r, a.height, " +
                "       a.keyin_clerk, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.keyin_clerk) keyin_clerk_name, " +
                "       a.keyin_date, a.keyin_time, " +
                "       a.modify_clerk, (SELECT b.emp_name FROM employee b WHERE b.emp_no = a.modify_clerk) modify_clerk_name, " +
                "       a.modify_date, a.modify_time " +
                "  FROM tprrecord a, chart b " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = ? " +
                "   AND a.chart_no = b.chart_no(+)  " +
                "ORDER BY chart_no, serno, assess_date desc, assess_time ";


        EntityFactory tprRecordEntity = new EntityFactory(con, queryString);
        return tprRecordEntity.findMultiple(new Object[]{chartNo, serno});
    }

    public List<Map<String, Object>> queryTPRRecordDataByChartNoSerno(int chartNo, int serno) throws SQLException {
        String queryString =
                "SELECT a.chart_no, a.serno, a.assess_date, a.assess_time, " +
                "       a.temperature, a.systolic_pressure, a.diastolic_pressure, a.pulse, " +
                "       a.respiration, a.weight, a.iv_fluids, a.urine, a.stool, a.bleed, " +
                "       a.amniotic_fluid, a.drainage_l, a.drainage_r, a.height, " +
                "       a.keyin_clerk, a.keyin_date, a.keyin_time, " +
                "       a.modify_clerk, a.modify_date, a.modify_time " +
                "  FROM tprrecord a " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = ?  " +
                "ORDER BY chart_no, serno, assess_date, assess_time ";

        EntityFactory tprRecordEntity = new EntityFactory(con, queryString);
        return tprRecordEntity.findMultiple(new Object[]{chartNo, serno});
    }

    public List<Map<String, Object>> queryTPRRecordDataByChartNoSernoAssessDate(int chartNo, int serno, String assessDate) throws SQLException {
        List<Map<String, Object>> tprMapList = queryTPRRecordDataByChartNoSerno(chartNo, serno);

        return tprMapList.stream()
                .filter(map -> assessDate.equals(castToStr(map.get("assess_date"))))
                .collect(Collectors.toList());
    }

    public Map<String, Object> queryTPRRecordDataByPrimaryKeys(int chartNo, int serno, String assessDate, String assessTime) throws SQLException {
        List<Map<String, Object>> tprMapList = queryTPRRecordDataByChartNoSerno(chartNo, serno);
        Map<String, Object> resultMap = new LinkedHashMap<>();

        return tprMapList.stream()
                .filter(map -> assessDate.equals(castToStr(map.get("assess_date")))
                            && assessTime.equals(castToStr(map.get("assess_time"))))
                .findAny().orElse(new LinkedHashMap<>());
    }

    public Map<String, Object> insertTPRRecord(List<Object> objects) throws SQLException {
        String insertString =
                "INSERT INTO tprrecord ( " +
                "   chart_no, serno, assess_date, assess_time, temperature, systolic_pressure, " +
                "   diastolic_pressure, pulse, respiration, weight, iv_fluids, urine, " +
                "   stool, bleed, amniotic_fluid, drainage_l, drainage_r, height, " +
                "   keyin_clerk, keyin_date, keyin_time ) " +
                "VALUES ( ?, ?, ?, ?, ?, ?, " +
                "         ?, ?, ?, ?, ?, ?, " +
                "         ?, ?, ?, ?, ?, ?," +
                "         ?, ?, ? ) ";
        EntityFactory tprRecordEntity = new EntityFactory(con, insertString);
        return tprRecordEntity.upsertSingle(objects);
    }

    public Map<String, Object> updateTPRRecordByPrimaryKeys(List<Object> objects) throws SQLException {
        String updateString =
                "UPDATE tprrecord " +
                "   SET temperature        = ? , " +
                "       systolic_pressure  = ? , " +
                "       diastolic_pressure = ? , " +
                "       pulse              = ? , " +
                "       respiration        = ? , " +
                "       weight             = ? , " +
                "       iv_fluids          = ? , " +
                "       urine              = ? , " +
                "       stool              = ? , " +
                "       bleed              = ? , " +
                "       amniotic_fluid     = ? , " +
                "       drainage_l         = ? , " +
                "       drainage_r         = ? , " +
                "       height             = ? , " +
                "       modify_clerk       = ? , " +
                "       modify_date        = ? , " +
                "       modify_time        = ?  " +
                " WHERE chart_no           = ?  " +
                "   AND serno              = ?  " +
                "   AND assess_date        = ?  " +
                "   AND assess_time        = ?  ";

        EntityFactory tprRecordEntity = new EntityFactory(con, updateString);
        return tprRecordEntity.upsertSingle(objects);
    }

    public Map<String, Object> deleteTPRRecordByPrimaryKeys(List<Object> objects) throws SQLException {
        String deleteString =
                "DELETE FROM tprrecord " +
                " WHERE chart_no = ?  " +
                "   AND serno = ?  " +
                "   AND assess_date = ?  " +
                "   AND assess_time = ? ";

        EntityFactory tprRecordEntity = new EntityFactory(con, deleteString);
        return tprRecordEntity.upsertSingle(objects);
    }

    public static void main(String[] args) {
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        Connection myConnection = null;
        String resultStrng = null;

        try {
            myConnection = jdbcUtil.getConnection();
            TPRRecord tprRecord = new TPRRecord(myConnection);
            int chartNo = 214142;
            int serno = 369810;
            String assessDate = "1040802";
            String assessTime = "1205";

            System.out.println("\nTPRRecord.queryTPRRecordByChartNoSerno chartNo=" + chartNo + " serno=" + serno + " JsonArray: " +
                    MapUtil.listMapToJsonArray(tprRecord.queryTPRRecordByChartNoSerno(chartNo, serno)));

//            System.out.println("\nTPRRecord.queryTPRRecordDataByChartNoSerno chartNo=" + chartNo + " serno=" + serno + " JsonArray: " +
//                    MapUtil.listMapToJsonArray(tprRecord.queryTPRRecordDataByChartNoSerno(chartNo, serno)));

//            System.out.println("\nTPRRecord.queryTPRRecordDataByChartNoSernoAssessDate chartNo=" + chartNo + " serno=" + serno + " assessDate=" + assessDate + " JsonArray: " +
//                    MapUtil.listMapToJsonArray(tprRecord.queryTPRRecordDataByChartNoSernoAssessDate(chartNo, serno, assessDate)));


//            System.out.println("\nTPRRecord.queryTPRRecordDataByChartNoSernoAssessDateAssessTime chartNo=" + chartNo +
//                    " serno=" + serno + " assessDate=" + assessDate + " assessTime=" + assessTime + " JsonObject: " +
//                    MapUtil.mapToJsonObject(tprRecord.queryTPRRecordDataByPrimaryKeys(chartNo, serno, assessDate, assessTime)));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}
