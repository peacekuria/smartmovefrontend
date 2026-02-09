import React, { useState } from "react";
import {
  FiTruck,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiPower,
  FiAlertTriangle,
  FiBarChart2,
  FiMapPin,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MoverDashboard.css";

export default function MoverDashboard() {
  const [available, setAvailable] = useState(true);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      client: "Jane Doe",
      date: "22 Sept 2026",
      location: "Westlands",
      status: "in-progress",
    },
    {
      id: 2,
      client: "Mark Otieno",
      date: "18 Sept 2026",
      location: "Kilimani",
      status: "completed",
    },
  ]);

  const toggleAvailability = () => {
    setAvailable((prev) => !prev);
    toast.success(
      available
        ? "You are now unavailable for new jobs"
        : "You are now available for new jobs",
    );
  };

  const markComplete = (id) => {
    const job = jobs.find((j) => j.id === id);

    if (job.status === "completed") {
      toast.info("This job has already been completed");
      return;
    }

    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: "completed" } : job,
      ),
    );

    toast.success("Job marked as completed successfully");
  };

  const unavailableFeature = () => {
    toast.error("This feature is not available yet");
  };

  return (
    <div className="dashboard">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>Mover Dashboard</h1>
          <p>Monitor jobs, manage availability, and track performance</p>
        </div>

        <button
          className={`availability-toggle ${available ? "on" : "off"}`}
          onClick={toggleAvailability}
        >
          <FiPower />
          {available ? "Available" : "Unavailable"}
        </button>
      </header>

      {/* KPI CARDS */}
      <section className="dashboard-grid">
        <div className="dashboard-card">
          <FiTruck className="card-icon" />
          <h3>Active Jobs</h3>
          <p className="stat">
            {jobs.filter((j) => j.status === "in-progress").length}
          </p>
          <span>Currently ongoing</span>
        </div>

        <div className="dashboard-card">
          <FiCalendar className="card-icon" />
          <h3>Upcoming Moves</h3>
          <p className="stat">5</p>
          <span>Next 14 days</span>
        </div>

        <div className="dashboard-card">
          <FiDollarSign className="card-icon" />
          <h3>Total Earnings</h3>
          <p className="stat">KES 120,000</p>
          <span>This month</span>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard-actions">
        <button onClick={unavailableFeature}>
          <FiBarChart2 />
          Earnings Breakdown
        </button>
        <button onClick={unavailableFeature}>
          <FiMapPin />
          Live Job Tracking
        </button>
        <button onClick={unavailableFeature}>
          <FiAlertTriangle />
          Report an Issue
        </button>
      </section>

      {/* JOB LIST */}
      <section className="dashboard-section">
        <h2>Recent Jobs</h2>

        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-info">
              <strong>{job.client}</strong>
              <span>{job.date}</span>
              <span>{job.location}</span>
            </div>

            <div className="job-controls">
              <span className={`status ${job.status}`}>
                {job.status === "in-progress" ? (
                  <>
                    <FiClock /> In Progress
                  </>
                ) : (
                  <>
                    <FiCheckCircle /> Completed
                  </>
                )}
              </span>

              {job.status === "in-progress" && (
                <button
                  className="complete-btn"
                  onClick={() => markComplete(job.id)}
                >
                  Complete Job
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
