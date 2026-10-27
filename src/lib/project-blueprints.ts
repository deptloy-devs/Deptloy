export interface ArchitectureModule {
  name: string;
  detail: string;
}

export interface ProjectBlueprint {
  slug: string;
  category: "healthcare" | "operations" | "commerce" | "professional";
  categoryLabel: string;
  title: string;
  kicker: string;
  challenge: string;
  solution: string;
  modules: [ArchitectureModule, ArchitectureModule, ArchitectureModule, ArchitectureModule];
  journey: string[];
  possibilities: string[];
  accent: string;
}

// Illustrative product blueprints. These are not customer case studies or delivered results.
export const projectBlueprints: ProjectBlueprint[] = [
  {
    slug: "care-network",
    category: "healthcare",
    categoryLabel: "Healthcare operations",
    title: "One connected workspace for a multi-location care network.",
    kicker: "Patient experience + clinical operations",
    challenge: "Appointments, intake forms, calendars and staff workflows often live in different systems. Teams spend time reconciling information rather than helping patients.",
    solution: "A tailored operations platform can connect booking, permissioned patient information, staff scheduling and reporting while integrating with approved existing systems.",
    modules: [
      { name: "Patient portal", detail: "Appointments, intake and updates in one place." },
      { name: "Scheduling engine", detail: "Coordinated resources, rooms and provider availability." },
      { name: "Data integrations", detail: "Approved connections to existing clinical systems." },
      { name: "Operations dashboard", detail: "Role-based visibility for distributed teams." },
    ],
    journey: ["Patient submits a request", "Rules check availability", "Team reviews the booking", "Records and dashboards stay in sync"],
    possibilities: ["Fewer duplicate entries", "Clearer staff handoffs", "A more consistent patient journey"],
    accent: "#8478e0",
  },
  {
    slug: "field-operations",
    category: "operations",
    categoryLabel: "Field services & logistics",
    title: "A live operations hub for teams working in the field.",
    kicker: "Dispatch + field execution",
    challenge: "Requests arrive from several channels while dispatchers, field teams and finance each work from a different view of the job.",
    solution: "A custom dispatch platform can join intake, scheduling, technician updates and invoicing around one job record, with integrations chosen for the company’s existing stack.",
    modules: [
      { name: "Request intake", detail: "Capture and prioritize jobs from multiple channels." },
      { name: "Dispatch board", detail: "Coordinate assignments and progress in real time." },
      { name: "Technician app", detail: "Mobile checklists, status and job evidence." },
      { name: "Billing connector", detail: "Pass approved completion data into invoicing." },
    ],
    journey: ["Customer creates a request", "Dispatcher assigns a team", "Technician updates the job", "Operations and billing get the result"],
    possibilities: ["One view of every active job", "Faster internal coordination", "Less manual re-entry"],
    accent: "#fd9150",
  },
  {
    slug: "commerce-platform",
    category: "commerce",
    categoryLabel: "Retail & multi-location commerce",
    title: "A commerce platform that connects every channel.",
    kicker: "Orders + inventory + customer experience",
    challenge: "An online storefront, physical locations, warehouse and support desk can all have different answers about the same order.",
    solution: "A purpose-built commerce layer can connect channel orders, product information, inventory events and customer support within a cohesive experience.",
    modules: [
      { name: "Customer storefront", detail: "A fast, branded digital shopping experience." },
      { name: "Inventory service", detail: "A shared availability view across locations." },
      { name: "Order orchestration", detail: "Rules for fulfillment and status updates." },
      { name: "Support console", detail: "Customer history and order context together." },
    ],
    journey: ["Customer places an order", "Inventory is checked", "Fulfillment is coordinated", "Customer and staff receive updates"],
    possibilities: ["More reliable order context", "Consistent cross-channel service", "A foundation for new locations"],
    accent: "#ef7a5e",
  },
  {
    slug: "client-workspace",
    category: "professional",
    categoryLabel: "Professional services",
    title: "A secure client workspace built around the engagement.",
    kicker: "Intake + collaboration + delivery",
    challenge: "Documents, approvals, messages and deadlines get scattered across email chains and unrelated portals, making progress difficult to follow.",
    solution: "A dedicated client portal can bring onboarding, project milestones, document access and internal review workflows into one permission-aware system.",
    modules: [
      { name: "Client intake", detail: "Structured onboarding and initial requirements." },
      { name: "Secure documents", detail: "Permissions and review status for shared files." },
      { name: "Workflow engine", detail: "Approvals, notifications and task ownership." },
      { name: "Delivery dashboard", detail: "A clear picture of milestones and next steps." },
    ],
    journey: ["Client starts an engagement", "Documents and tasks are assigned", "Reviewers approve milestones", "Everyone sees the current status"],
    possibilities: ["Clearer accountability", "Less email back-and-forth", "A calmer client experience"],
    accent: "#5750a8",
  },
];
