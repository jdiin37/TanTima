package model;

import library.dateutility.DateUtil;
import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;


/**
 * Created by jeffy on 2018/5/16.
 */
public class URIRecord {
    private Connection con;

    public URIRecord(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryINPUriByChartNoSerNoDateRange(int chartNo, int serno, String startDate, String endDate) throws SQLException {
        String queryString =
                "SELECT 'INP' visit_type, a.ckin_date, a.chart_no, a.serno, " +
                "       b.rec_count, b.disease_code, c.title1 code_name_c, c.title2 code_name_e " +
                "  FROM admit a, chgicdcm b, disicd10 c " +
                " WHERE a.chart_no = ? " +
                "   AND a.serno = (SELECT MAX(b.serno) " +
                "                    FROM admit b WHERE b.chart_no = a.chart_no AND b.serno < ? ) " +
                "   AND discharge_date BETWEEN ? AND ? " +
                "   AND a.chart_no = b.chart_no " +
                "   AND a.serno = b.serno  " +
                "   AND b.report_class = 'I' " +
                "   AND b.disease_type = 'D' " +
                "   AND b.icd_type = 'ICD10' " +
                "   AND b.disease_code BETWEEN 'J18' AND 'J99.zzz' " +
                "   AND b.disease_code = c.code(+) " +
                "ORDER BY b.rec_count ";


        EntityFactory dummyEntity = new EntityFactory(con, queryString);
        return dummyEntity.findMultiple(new Object[]{chartNo, serno, startDate, endDate});
    }

    public List<Map<String, Object>> queryOPDUriByChartNoDateRange(int chartNo, String startDate, String endDate) throws SQLException {

        String queryString =
                "SELECT 'OPD' visit_type, a.view_date, a.chart_no, a.duplicate_no, " +
                "       b.rec_count, b.disease_code, c.title1 code_name_c, c.title2 code_name_e " +
                "  FROM patopd a, chgopdicdcm b, disicd10 c " +
                " WHERE a.view_date BETWEEN ? AND ? " +
                "   AND a.chart_no = ? " +
                "   AND a.view_date = b.view_date " +
                "   AND a.chart_no = b.chart_no " +
                "   AND a.duplicate_no = b.duplicate_no " +
                "   AND b.report_class = 'O' " +
                "   AND b.disease_type = 'D' " +
                "   AND b.icd_type = 'ICD10' " +
                "   AND b.disease_code BETWEEN 'J18' AND 'J99.zzz' " +
                "   AND b.disease_code = c.code(+) " +
                "ORDER BY b.rec_count ";

        EntityFactory dummyEntity = new EntityFactory(con, queryString);
        return dummyEntity.findMultiple(new Object[]{startDate, endDate, chartNo});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            URIRecord uriRecord = new URIRecord(myConnection);

            int chartNo = 158689;
            int serno = 141545;
            String endDate = "1050912";
            String startDate = DateUtil.dateToROCDateString(DateUtil.rocDateStringToDate(endDate).plus(-14, ChronoUnit.DAYS));

            System.out.printf("\nUriRecord.queryINPUriByChartNoSerNoDateRange chartNo=%d serno=%d startDate=%s endDate=%s JsonArray: %s ",
                    chartNo, serno, startDate, endDate, MapUtil.listMapToJsonArray(uriRecord.queryINPUriByChartNoSerNoDateRange(chartNo, serno, startDate, endDate)));

            System.out.printf("\nUriRecord.queryINPUriByChartNoSerNoDateRange chartNo=%d startDate=%s endDate=%s JsonArray: %s ",
                    chartNo, startDate, endDate, MapUtil.listMapToJsonArray(uriRecord.queryOPDUriByChartNoDateRange(chartNo, startDate, endDate)));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

