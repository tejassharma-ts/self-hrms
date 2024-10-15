export function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) {
    return "Dashboard";
  } else if (pathname.startsWith("/attendance")) {
    return "Daily Attendance";
  } else if (pathname.startsWith("/my-team")) {
    return "My Team";
  } else if (pathname.startsWith("/leave")) {
    return "Employee Leave Management";
  } else if (pathname.startsWith("/expenses")) {
    return "Expense Overview";
  } else if (pathname.startsWith("/payroll/history")) {
    return "Payroll History";
  } else if (pathname.startsWith("/payroll/overview")) {
    return "Payroll Overview";
  } else if (pathname.startsWith("/add-new-employee")) {
    return "Add new Employee";
  } else if (pathname.startsWith("/department")) {
    return "Add new Departments";
  }
  return "";
}
