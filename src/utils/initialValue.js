export const loginForm = {
  email: "",
  password: ""
}

export const signupForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  Description: "",
}

export const Ticket = {
  topic: "",
  type: "",
  severity: "",
  description: "",
  createdAt: new Date()
}

export const severity = [
  {
    name: 'Critical',
    value: 'critical'
  },
  {
    name: 'High',
    value: 'high'
  },
  {
    name: 'Medium',
    value: 'medium'
  },
  {
    name: 'Low',
    value: 'low'
  },
]

export const TicketType = [
  {
    name: 'Incident',
    value: 'incident'
  },
  {
    name: 'Problem Task',
    value: 'problem task'
  },
  {
    name: 'Decision Task',
    value: 'decision task'
  },
  {
    name: 'Change task',
    value: 'change task'
  },
  {
    name: 'Service request',
    value: 'service request'
  }
]