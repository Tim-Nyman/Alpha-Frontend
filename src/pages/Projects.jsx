import React, { useEffect, useState } from 'react'
import ModalButton from '../partials/components/ModalButton'
import { useAuth } from '../contexts/AuthContext'
import ProjectCard from '../partials/components/ProjectCards'
import AddProjectModal from '../partials/components/Modals/AddProjectModal'

const Projects = () => {
  const { authFetch } = useAuth();
  const [projects, setProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState(1);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const res = await authFetch("https://localhost:7167/api/Projects");
    const data = await res.json();
    setProjects(data);

    const completedProjects = data.filter(projects => projects.status.id === 2);
    setCompletedProjects(completedProjects);
  }

  const filteredProjects = filterProjects === 1 ? projects : completedProjects;

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <AddProjectModal getProjects={getProjects}></AddProjectModal>
        <ModalButton type="add" target="#addProjectModal" text="Add Project"></ModalButton>
      </div>

      <div className="header-project-divider btn-group">

        <div>
          <span className="filter-text" onClick={() => setFilterProjects(1)}>All [{projects.length}]</span>
        </div>

        <div>
          <span className="filter-text" onClick={() => setFilterProjects(2)}>Completed [{completedProjects.length}]</span>
        </div>
      </div>

      <div>
        <ProjectCard projects={filteredProjects} getProjects={getProjects} />
      </div>
    </div>
  )
}

export default Projects