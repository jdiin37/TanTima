package model;

import library.dateutility.DateUtil;
import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/5/11.
 */
public class LabRecord {
    private Connection con;

    public LabRecord(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryLabListByChartNoDateRange(int chartNo, String startDate, String endDate) throws SQLException {
        String strChartNo = String.valueOf(chartNo);
        String adStartDate = DateUtil.rocDateStringToADDateString(startDate) + "000000";
        String adEndDate = DateUtil.rocDateStringToADDateString(endDate) + "235959";

        String queryString =
                "SELECT a.lab_reportno, '' germ_group, '' rpt_type, to_number(a.chart_no) chart_no, a.pt_source, " +
                "       '' years, to_char(a.lab_date, 'YYYYMMDD') lab_date, to_char(a.req_date, 'YYYYMMDD') req_date, " +
                "       a.kind_id, b.kind_flag, b.kind_name, b.report_subtitle, c.serno " +
                "  FROM labrecordm a, assaykind b, requisition c " +
                " WHERE a.chart_no = ? " +
                "   AND a.lab_date BETWEEN to_date(?, 'YYYYMMDDHH24MISS') AND to_date(?, 'YYYYMMDDHH24MISS') " +
                "   AND a.report_date IS NOT NULL " +
                "   AND a.kind_id = b.kind_id(+) " +
                "   AND a.lab_reportno = c.req_no(+) " +
                "UNION ALL " +
                "SELECT a.lab_reportno, a.germ_group, a.rpt_type, to_number(a.chart_no) chart_no, a.pt_source, " +
                "       '' years, to_char(a.lab_date, 'YYYYMMDD') lab_date, to_char(a.req_date, 'YYYYMMDD') req_date, " +
                "       a.kind_id, b.kind_flag, b.kind_name, b.report_subtitle, c.serno " +
                "  FROM germ_resultm a, assaykind b, requisition c " +
                " WHERE a.chart_no = ? " +
                "   AND a.lab_date BETWEEN to_date(?, 'YYYYMMDDHH24MISS') AND to_date(?, 'YYYYMMDDHH24MISS') " +
                "   AND a.report_date IS NOT NULL " +
                "   AND a.kind_id = b.kind_id(+) " +
                "   AND a.lab_reportno = c.req_no(+) " +
                "ORDER BY lab_date desc, kind_id ";

        EntityFactory labRecordEntity = new EntityFactory(con, queryString);
        return labRecordEntity.findMultiple(new Object[]{strChartNo, adStartDate, adEndDate, strChartNo, adStartDate, adEndDate});
    }

    public List<Map<String, Object>> queryLabDdataByChartNoLabTypeLabItemsAndRange(int chartNo, String kindId, String startDate,
                                                                                   String endDate, String labItems) throws SQLException {
        List<Object> sqlParaObjects = new ArrayList();

        String strChartNo = String.valueOf(chartNo); // chart_no int -> String
        String adStartDate = DateUtil.rocDateStringToADDateString(startDate) + "000000"; // roc date string -> ad date string
        String adEndDate = DateUtil.rocDateStringToADDateString(endDate) + "235959"; // roc date string -> ad date string

        sqlParaObjects.add(strChartNo);
        sqlParaObjects.add(adStartDate);
        sqlParaObjects.add(adEndDate);
        sqlParaObjects.add(kindId);
        sqlParaObjects.addAll(Arrays.asList(labItems.split("\\|")));

        List<Object> nullObjects = new ArrayList<>();
        for (int i = sqlParaObjects.size(); i < 44; i++) {
            nullObjects.add(null);
        }
        sqlParaObjects.addAll(nullObjects);

        String queryString =
                "SELECT TO_NUMBER(a.chart_no) chart_no, a.kind_id, b.kind_name, b.kind_flag, " +
                "       TO_CHAR(a.lab_date, 'YYYYMMDD') lab_date, c.lab_reportno, c.assay_id, " +
                "       c.duplicate_no, c.assay_judgetype, c.result_val, c.normal_range, " +
                "       c.unit, c.report_normalrange, c.lab_status, c.result_status, c.result_kind " +
                "  FROM labrecordm a, assaykind b, labrecordd c " +
                " WHERE a.chart_no = ? " +
                "   AND a.lab_date BETWEEN TO_DATE(?, 'YYYYMMDDHH24MISS') AND TO_DATE(?, 'YYYYMMDDHH24MISS') " +
                "   AND a.kind_id = ? " +
                "   AND a.report_date IS NOT NULL " +
                "   AND a.kind_id = b.kind_id(+) " +
                "   AND a.lab_reportno = c.lab_reportno " +
                "   AND c.assay_id IN ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                "                       ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                "   AND C.RPT_FLAG = '1' " +
                " ORDER BY c.assay_id, c.lab_reportno ";

        EntityFactory labDdataEntity = new EntityFactory(con, queryString);
        return labDdataEntity.findMultiple(sqlParaObjects.toArray());
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            LabRecord labRecord = new LabRecord(myConnection);

            int chartNo = 74881;
            String startDate = "1000401";
            String endDate = "1051230";

            System.out.printf("\nLabRecord.queryLabListByChartNoDateRange chartNo=%d startDate=%s endDate=%s JsonArray:%s ",
                    chartNo, startDate, endDate, MapUtil.listMapToJsonArray(labRecord.queryLabListByChartNoDateRange(chartNo, startDate, endDate)).toString());

            Object[] objects = new Object[] {74881, "A3", "1000401", "1051230"};
            List<Object> inObject2 = Arrays.asList(objects);

            System.out.println("\nLabDdata.queryLabDdataByChartNoLabTypeLabItemsAndRange JsonArray: " +
                    MapUtil.listMapToJsonArray(labRecord.queryLabDdataByChartNoLabTypeLabItemsAndRange(74881,
                            "A3", "1000401", "1051230", "Hct|Hemoglobin(Hb)|MCH|MCHC|MCV|Plt")));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}



