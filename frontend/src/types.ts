export enum EventType {
  MoodObservation = "mood",
  RegularMedicationTaken = "regular_medication_taken",
  VisitCompleted = "visit_completed",
  TaskCompleted = "task_completed",
  CheckIn = "check_in",
  CheckOut = "check_out",
  IncontinencePadObservation = "incontinence_pad_observation",
  MentalHealthObservation = "mental_health_observation",
  GeneralObservation = "general_observation",
  FoodIntakeObservation = "food_intake_observation",
  FluidIntakeObservation = "fluid_intake_observation",
  TaskCompletionReverted = "task_completion_reverted",
}

export type GroupedDates = {
  year: string;
  month: string;
  dates: string[];
};

export type CareData = {
  careRecipeintData: CareRecipientData[] | [];
  eventDates: GroupedDates[];
  careRecipientName: string;
  loading: boolean;
  error: string;
};

export type CareRecipientData = {
  id: string;
  eventType: EventType;
  timestamp: string;
  name: string;
  payload: string;
  careRecipientName: string;
  caregiverFirstName: string;
  caregiverLastName: string;
};
