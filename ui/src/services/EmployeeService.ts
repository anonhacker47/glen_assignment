import Api from "@/services/Api";

const GeneralService = {
  fetchEmployees: async () => {
    const response = await Api().get("/employees");
    return response.data;
  },

  fetchJobs: async () => {
    const response = await Api().get("/jobs");
    return response.data;
  },

  fetchSchedule: async () => {
    const response = await Api().get("/schedule");
    return response.data;
  },

  assignEmployee: async (employeeId: number, jobId: number) => {
    const response = await Api().post("/assign", {
      employeeId,
      jobId,
    });
    return response;
  },

  deleteAssignment: async (employeeId: number, jobId: number) => {
    const response = await Api().delete("/assign/delete", {
      data: { employeeId, jobId },
    });
    return response;
  },
};

export default GeneralService;
