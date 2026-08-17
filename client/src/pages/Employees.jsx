import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, X } from "lucide-react";
import { Search } from "lucide-react";
import EmployeeCard from "../component/EmployeeCard";
import EmployeeForm from "../component/EmployeeForm";

const Employees = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setSelectDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModel, setshowCreateModel] = useState(false);

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    setEmployee(
      dummyEmployeeData.filter((emp) =>
        selectDept ? emp.department === selectDept : emp,
      ),
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const filtered = employee.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="animate-fade-in">
      {/* headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb:8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button
          onClick={() => setshowCreateModel(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>
      {/* search-bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb:6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            placeholder="search employees..."
            className="w-full pl-10!"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          value={selectDept}
          onChange={(e) => setSelectDept(e.target.value)}
          className="max-w-40"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option value={deptName} key={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/* employee card */}

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full " />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 ">
          {filtered.length == 0 ? (
            <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 ">
              No employees found
            </p>
          ) : (
            filtered.map((emp) => (
              // <p key={emp.id}>{emp.firstName}</p>

              <EmployeeCard
                key={emp}
                employee={emp}
                onDelete={fetchEmployee}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}

      {/* create employee model */}

      {showCreateModel && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setshowCreateModel(false)}
        >
          <div className="fixed inset-0" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add New Employee
                </h2>
                <p className="text-slate-500 mt-0.5 text-sm">
                  Create a user account and employee profile
                </p>
              </div>
              <button
                onClick={() => setshowCreateModel(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5 " />
              </button>
            </div>
            <div className="p-6 ">
              <EmployeeForm 
             onSuccess={() => {setshowCreateModel(false);
              fetchEmployee();
             }} onCancel={() => setshowCreateModel(false)}/>
            </div>
          </div>
        </div>
      )}
      {/* edit employee model */}
      {editEmployee && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit Employee
                </h2>
                <p className="text-slate-500 mt-0.5 text-sm">
                  update employee details
                </p>
              </div>
              <button
                onClick={() => setEditEmployee(null)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5 " />
              </button>
            </div>

            <div className="p-6">
             <EmployeeForm initialData={editEmployee}
             onSuccess={() => {setEditEmployee(null);
              fetchEmployee();
             }} onCancel={() => setEditEmployee(null)}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
