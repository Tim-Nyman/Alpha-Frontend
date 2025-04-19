import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const apiUrl = "https://asp-net-backend.azurewebsites.net/api/signin";
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const defaultValues = { accessToken: null, role: "admin", isAuthenticated: true, loading: false }
  const [auth, setAuth] = useState(defaultValues)

  useEffect(() => {
    const storeToken = localStorage.getItem('authToken');
    if (storeToken)
      setToken(storeToken);

    setLoading(false);
    fetchAuthData()
  }, [])

  const fetchAuthData = async () => {
    setAuth({ ...defaultValues, loading: false })

    try {
      const res = await fetch(apiEndpoint)

      if (res.ok) {
        const data = await response.json();
        setAuth({ accessToken: data.accessToken, role: data.role, isAuthenticated: true, loading: false });
      }

    } catch (error) {
      setAuth(defaultValues)
    }
  }

  //Tar emot uppgifterna och skickar iväg.
  const signUp = async () => {

  }

  const signIn = async (email, password, isPersistent = false) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isPersistent })
      });

      const data = await res.json();
      //sätt felmeddelande
      if (!res.ok) {
        setErrorMessage(data.error);
        return false
      }

      setToken(data.token)
      localStorage.setItem("authToken", data.token);
      return true;
    }
    catch {
      setErrorMessage("Invalid email or password.");
      return false
    }
  }

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  }


  const addProject = async ({
    imageUrl,
    projectName,
    description,
    budget,
    startDate,
    endDate,
    clientId,
    userId,
  }) => {
    try {
      const res = await authFetch("https://asp-net-backend.azurewebsites.net/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ProjectName: projectName,
          Description: description,
          StartDate: startDate,
          EndDate: endDate,
          Budget: budget,
          ClientId: clientId,
          UserId: userId,
          ImageUrl: imageUrl
        }),
      });

      const data = await res.json();
      console.log("Project created successfully:", data);
      return true;
    } catch (error) {
      console.error("Error submitting project:", error);
      return false;
    }
  };

  const editProject = async ({
    projectId,
    image,
    projectName,
    description,
    startDate,
    endDate,
    budget,
    clientId,
    userId,
    statusId
  }) => {
    try {
      const res = await authFetch("https://asp-net-backend.azurewebsites.net/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: projectId,
          ProjectName: projectName,
          Description: description,
          StartDate: startDate,
          EndDate: endDate,
          Budget: budget,
          ClientId: clientId,
          UserId: userId,
          Image: image,
          StatusId: statusId
        }),
      });
    } catch (error) {
      console.error("Error submitting project:", error);
      return false;
    }
  };


  const deleteProject = async (projectId) => {
    try {
      const res = await authFetch(`https://asp-net-backend.azurewebsites.net/api/projects/${projectId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      "X-API-KEY": import.meta.env.VITE_X_API_KEY,
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return fetch(url, { ...options, headers })
  }

  return (
    <AuthContext.Provider value={{ auth, loading, token, user, signUp, signIn, signOut, authFetch, addProject, deleteProject, editProject }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);