export const caseSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Case Management Schema",
  description: "Schema for registering and managing needy/poor families",
  type: "object",
  required: ["basicInfo"],
  properties: {
    id: {
      type: "string",
      description: "Unique case identifier"
    },
    basicInfo: {
      type: "object",
      required: ["nationalId", "maritalStatus", "familyMembersCount"],
      properties: {
        nationalId: {
          type: "string",
          pattern: "^[0-9]{14}$",
          description: "Egyptian National ID (14 digits)"
        },
        fullName: {
          type: "string",
          minLength: 2,
          description: "Full name of the primary applicant"
        },
        phone: {
          type: "string",
          pattern: "^[0-9]{11}$",
          description: "Phone number"
        },
        address: {
          type: "string",
          description: "Full address"
        },
        governorate: {
          type: "string",
          description: "Governorate"
        },
        maritalStatus: {
          type: "string",
          enum: ["married", "divorced", "widowed", "single"],
          description: "Marital status"
        },
        familyMembersCount: {
          type: "integer",
          minimum: 1,
          description: "Number of family members"
        },
        caseType: {
          type: "string",
          enum: ["new", "followUp", "urgent"],
          description: "Type of case"
        }
      }
    },
    familyMembers: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "relation", "age"],
        properties: {
          id: { type: "string" },
          name: { type: "string", minLength: 2 },
          relation: {
            type: "string",
            enum: ["spouse", "son", "daughter", "father", "mother", "brother", "sister", "other"]
          },
          age: { type: "integer", minimum: 0, maximum: 120 },
          education: {
            type: "string",
            enum: ["none", "primary", "middle", "secondary", "university", "higher"]
          },
          occupation: {
            type: "string",
            description: "Job or occupation"
          },
          monthlyIncome: {
            type: "number",
            minimum: 0
          },
          isDependent: {
            type: "boolean",
            description: "Whether this person depends on the family for support"
          }
        }
      }
    },
    previousMarriage: {
      type: "object",
      properties: {
        hasPreviousMarriage: { type: "boolean" },
        numberOfMarriages: { type: "integer", minimum: 1 },
        separationReason: {
          type: "string",
          enum: ["divorce", "death", "separation", "other"]
        },
        impactOnSituation: {
          type: "string",
          description: "Description of how previous marriage affects current situation"
        }
      }
    },
    debts: {
      type: "object",
      properties: {
        hasDebts: { type: "boolean" },
        debts: {
          type: "array",
          items: {
            type: "object",
            required: ["type", "amount"],
            properties: {
              id: { type: "string" },
              type: {
                type: "string",
                enum: ["bank", "microfinance", "shop", "individual", "utilities", "rent", "other"]
              },
              amount: { type: "number", minimum: 0 },
              monthlyPayment: { type: "number", minimum: 0 },
              creditor: { type: "string" },
              description: { type: "string" }
            }
          }
        },
        hasLegalCases: { type: "boolean" },
        legalCases: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              type: { type: "string" },
              court: { type: "string" },
              status: { type: "string" },
              amount: { type: "number" }
            }
          }
        }
      }
    },
    income: {
      type: "object",
      properties: {
        sources: {
          type: "object",
          properties: {
            salary: { type: "number", minimum: 0 },
            business: { type: "number", minimum: 0 },
            pension: { type: "number", minimum: 0 },
            charity: { type: "number", minimum: 0 },
            assistance: { type: "number", minimum: 0 },
            rent: { type: "number", minimum: 0 },
            other: { type: "number", minimum: 0 }
          }
        },
        totalIncome: {
          type: "number",
          minimum: 0,
          description: "Auto-calculated total income"
        }
      }
    },
    expenses: {
      type: "object",
      properties: {
        items: {
          type: "object",
          properties: {
            food: { type: "number", minimum: 0 },
            treatment: { type: "number", minimum: 0 },
            rent: { type: "number", minimum: 0 },
            education: { type: "number", minimum: 0 },
            utilities: { type: "number", minimum: 0 },
            transportation: { type: "number", minimum: 0 },
            clothing: { type: "number", minimum: 0 },
            other: { type: "number", minimum: 0 }
          }
        },
        totalExpenses: {
          type: "number",
          minimum: 0,
          description: "Auto-calculated total expenses"
        }
      }
    },
    work: {
      type: "object",
      properties: {
        workingMembersCount: { type: "integer", minimum: 0 },
        employedMembers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              memberId: { type: "string" },
              job: { type: "string" },
              stability: {
                type: "string",
                enum: ["stable", "unstable", "seasonal"]
              },
              monthlyIncome: { type: "number", minimum: 0 }
            }
          }
        },
        unableToWork: {
          type: "boolean",
          description: "Is any adult unable to work?"
        },
        unableToWorkReasons: {
          type: "array",
          items: {
            type: "string",
            enum: ["illness", "disability", "oldAge", "noJobs", "caregiving", "other"]
          }
        },
        hasSkills: {
          type: "boolean",
          description: "Does the family have skills that can generate income?"
        },
        skills: {
          type: "array",
          items: { type: "string" }
        }
      }
    },
    housing: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["apartment", "house", "room", "shared", "homeless"]
        },
        ownership: {
          type: "string",
          enum: ["owned", "rented", "ceded", "withRelative", "other"]
        },
        roomsCount: { type: "integer", minimum: 0 },
        floorType: {
          type: "string",
          enum: ["tile", "cement", "earth", "wood", "other"]
        },
        wallCondition: {
          type: "string",
          enum: ["good", "medium", "poor"]
        },
        hasBathroom: { type: "boolean" },
        hasKitchen: { type: "boolean" },
        hasElectricity: { type: "boolean" },
        hasWater: { type: "boolean" },
        hasGas: { type: "boolean" },
        notes: { type: "string" }
      }
    },
    appliances: {
      type: "object",
      properties: {
        available: {
          type: "array",
          items: {
            type: "string",
            enum: ["tv", "refrigerator", "washingMachine", "microwave", "ac", "fan", "cooker", "waterHeater", "computer", "internet"]
          }
        },
        furniture: {
          type: "array",
          items: {
            type: "object",
            required: ["item", "condition"],
            properties: {
              id: { type: "string" },
              item: { type: "string" },
              condition: {
                type: "string",
                enum: ["excellent", "good", "fair", "poor"]
              },
              quantity: { type: "integer", minimum: 1 }
            }
          }
        }
      }
    },
    evaluation: {
      type: "object",
      required: ["researcherName", "decision"],
      properties: {
        researcherName: { type: "string" },
        visitDate: { type: "string", format: "date" },
        summary: { type: "string", description: "Researcher's summary and notes" },
        decision: {
          type: "string",
          enum: ["deserving", "notDeserving", "needsFurtherInvestigation", "partial"],
          description: "Final decision"
        },
        decisionReason: { type: "string" },
        recommendedAid: {
          type: "string",
          enum: ["monthly", "once", "food", "clothing", "medical", "housing", "none", "other"]
        },
        recommendedAmount: { type: "number" },
        priorityLevel: {
          type: "string",
          enum: ["high", "medium", "low"]
        },
        signatures: {
          type: "object",
          properties: {
            researcher: { type: "string" },
            supervisor: { type: "string" },
            applicant: { type: "string" }
          }
        },
        submittedAt: { type: "string", format: "date-time" }
      }
    },
    status: {
      type: "string",
      enum: ["draft", "submitted", "underReview", "approved", "rejected", "closed"],
      default: "draft"
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
};

// Empty initial state for a new case
export const getEmptyCase = () => ({
  id: crypto.randomUUID(),
  basicInfo: {
    nationalId: "",
    fullName: "",
    phone: "",
    address: "",
    governorate: "",
    maritalStatus: "",
    familyMembersCount: 1,
    caseType: "new"
  },
  familyMembers: [],
  previousMarriage: {
    hasPreviousMarriage: false
  },
  debts: {
    hasDebts: false,
    debts: [],
    hasLegalCases: false,
    legalCases: []
  },
  income: {
    sources: {
      salary: 0,
      business: 0,
      pension: 0,
      charity: 0,
      assistance: 0,
      rent: 0,
      other: 0
    },
    totalIncome: 0
  },
  expenses: {
    items: {
      food: 0,
      treatment: 0,
      rent: 0,
      education: 0,
      utilities: 0,
      transportation: 0,
      clothing: 0,
      other: 0
    },
    totalExpenses: 0
  },
  work: {
    workingMembersCount: 0,
    employedMembers: [],
    unableToWork: false,
    unableToWorkReasons: [],
    hasSkills: false,
    skills: []
  },
  housing: {
    type: "",
    ownership: "",
    roomsCount: 0,
    floorType: "",
    wallCondition: "good",
    hasBathroom: true,
    hasKitchen: true,
    hasElectricity: true,
    hasWater: true,
    hasGas: true,
    notes: ""
  },
  appliances: {
    available: [],
    furniture: []
  },
  evaluation: {
    researcherName: "",
    visitDate: "",
    summary: "",
    decision: "",
    decisionReason: "",
    recommendedAid: "",
    recommendedAmount: 0,
    priorityLevel: "medium"
  },
  status: "draft",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});
