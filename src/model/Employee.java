package model;

import library.utility.EntityFactory;
import library.utility.JDBCUtilities;
import library.utility.MapUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by jeffy on 2018/4/23.
 */
public class Employee {
    private Connection con;

    public Employee(Connection con) {
        this.con = con;
    }

    public Map<String, Object> queryEmployeeByEmpNo(String empNo) throws SQLException {
        String queryString =
                "SELECT a.emp_no, a.emp_name, a.in_date, a.out_date, a.current_stock, a.system_no, " +
                "       a.dept_no, b.dept_name, a.passwd, a.treat_title, " +
                "       (SELECT b.name FROM justname b " +
                "         WHERE b.categories = 'TREATTITLE' AND b.no = a.treat_title) AS title_name " +
                "  FROM employee a, department b  " +
                " WHERE a.emp_no = ?  " +
                "   AND a.dept_no = b.dept_no(+) ";

        EntityFactory employeeEntity = new EntityFactory(con, queryString);
        return employeeEntity.findSingle(new Object[]{empNo});
    }

    public List<Map<String, Object>> queryDoctorList() throws SQLException {
        String queryString =
                "SELECT a.doctor_no, a.doctor_name, a.div_no, a.div_name, a.in_date, a.delete_date, " +
                "       a.licence, a.ordermyself, a.tel_doctor_no " +
                "  FROM vdoctor a" +
                " ORDER BY a.doctor_no ";

        EntityFactory employeeEntity = new EntityFactory(con, queryString);
        return employeeEntity.findMultiple(new Object[]{});
    }

    public static void main(String[] args) {
        Connection myConnection = null;
        JDBCUtilities jdbcUtil = new JDBCUtilities();
        String resultStrng;

        try {
            myConnection = jdbcUtil.getConnection();
            Employee employee = new Employee(myConnection);

            System.out.println("\nEmployee.queryEmployeeByEmpNo empNo='ORCL' JsonObject: " +
                    MapUtil.mapToJsonObject(employee.queryEmployeeByEmpNo("ORCL")));

            System.out.println("\nEmployee.queryDoctorList JsonArray: " +
                    MapUtil.listMapToJsonArray(employee.queryDoctorList()));


        } catch (SQLException ex) {
            JDBCUtilities.printSQLException(ex);
        } finally {
            if (myConnection != null) {
                JDBCUtilities.closeConnection(myConnection);
            }
        }
    }
}