const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api'

// ==========================================
// API REQUEST HELPER
// ==========================================

const apiRequest = async (
  endpoint,
  options = {}
) => {
  const token =
    localStorage.getItem('doggoToken')

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization =
      `Bearer ${token}`
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Something went wrong'
    )
  }

  return data
}

// ==========================================
// AUTHENTICATION
// ==========================================

export const registerUser = async (
  userData
) => {
  return apiRequest(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(userData),
    }
  )
}

export const loginUser = async (
  credentials
) => {
  const data = await apiRequest(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(
        credentials
      ),
    }
  )

  if (data.token) {
    localStorage.setItem(
      'doggoToken',
      data.token
    )
  }

  return data
}

export const logoutUser = () => {
  localStorage.removeItem(
    'doggoToken'
  )
}

// ==========================================
// ANIMAL REPORTS
// ==========================================

export const getReports = async (
  query = ''
) => {
  return apiRequest(
    `/reports${query}`
  )
}

export const getMyReports =
  async () => {
    return apiRequest(
      '/reports/my'
    )
  }

export const getNearbyReports =
  async (
    latitude,
    longitude,
    radius = 10
  ) => {
    const params =
      new URLSearchParams({
        latitude,
        longitude,
        radius,
      })

    return apiRequest(
      `/reports/nearby?${params.toString()}`
    )
  }

export const getReport =
  async (reportId) => {
    return apiRequest(
      `/reports/${reportId}`
    )
  }

export const createReport =
  async (reportData) => {
    return apiRequest(
      '/reports',
      {
        method: 'POST',
        body: JSON.stringify(
          reportData
        ),
      }
    )
  }

export const updateReportStatus =
  async (
    reportId,
    status
  ) => {
    return apiRequest(
      `/reports/${reportId}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          status,
        }),
      }
    )
  }

// ==========================================
// DASHBOARD STATISTICS
// ==========================================

export const getReportStats =
  async () => {
    return apiRequest(
      '/reports/stats'
    )
  }