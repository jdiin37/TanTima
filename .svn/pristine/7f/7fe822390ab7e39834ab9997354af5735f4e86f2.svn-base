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
public class PhraseNur {
    private Connection con;

    public PhraseNur(Connection con) {
        this.con = con;
    }

    public List<Map<String, Object>> queryTypeListFromPhraseNurByEmpNo(String phraseEmpNo) throws SQLException {
        String queryString =
                "SELECT DISTINCT a.type " +
                "  FROM phrase_nur a " +
                " WHERE a.emp_no = ? ";

        EntityFactory phraseNurEntity = new EntityFactory(con, queryString);
        return phraseNurEntity.findMultiple(new Object[]{phraseEmpNo});
    }

    public List<Map<String, Object>> queryPhraseNurByEmpNoType(String phraseEmpNo, String type) throws SQLException {
        String queryString =
                "SELECT a.emp_no, a.type, a.seq_no, a.phrase " +
                "  FROM phrase_nur a " +
                " WHERE a.emp_no = ? " +
                "   AND a.type = ?  " +
                "ORDER BY a.seq_no ";

        EntityFactory phraseNurEntity = new EntityFactory(con, queryString);
        return phraseNurEntity.findMultiple(new Object[]{phraseEmpNo, type});
    }


    public List<Map<String, Object>> queryQuestionTxtFromPhraseNur() throws SQLException {
        String queryString =
                "SELECT a.emp_no, a.type, a.seq_no, a.phrase  " +
                "  FROM phrase_nur a " +
                " WHERE a.emp_no = 'DRPROG'  " +
                "   AND a.type = 'QUESTION_TXT' " +
                "ORDER BY a.seq_no ";


        EntityFactory phraseNurEntity = new EntityFactory(con, queryString);
        return phraseNurEntity.findMultiple(new Object[]{});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            PhraseNur phraseNur = new PhraseNur(myConnection);

            String phraseEmpNo = "ORCL";

            System.out.printf("\nPhraseNur.queryTypeListFromPhraseNurByEmpNo empNo='%s' JsonArray: %s ",
                    phraseEmpNo, MapUtil.listMapToJsonArray(phraseNur.queryTypeListFromPhraseNurByEmpNo(phraseEmpNo)));

            String type = "A";
            System.out.printf("\nPhraseNur.queryPhraseNurByEmpNoType empNo='%s' type='%s' JsonArray: %s ",
                    phraseEmpNo, type, MapUtil.listMapToJsonArray(phraseNur.queryPhraseNurByEmpNoType(phraseEmpNo, type)));

            System.out.printf("\nPhraseNur.queryQuestionTxtFromPhraseNur JsonArray: %s ",
                    MapUtil.listMapToJsonArray(phraseNur.queryQuestionTxtFromPhraseNur()));

        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}

