import React from "react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const MyApplications = ({ applications }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">
          You have not applied to any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Company</th>
                <th className="p-3 text-left text-sm font-semibold">Job Title</th>
                <th className="p-3 text-left text-sm font-semibold">Position</th>
                <th className="p-3 text-left text-sm font-semibold">Location</th>
                <th className="p-3 text-left text-sm font-semibold">Applied On</th>
                <th className="p-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{app.job.company}</td>

                  <td className="p-3 font-medium text-gray-800">
                    {app.job.title}
                  </td>

                  <td className="p-3">{app.job.position}</td>

                  <td className="p-3">{app.job.location}</td>

                  <td className="p-3 text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                        statusStyles[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
