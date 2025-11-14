import {
  PricingSetupFormData,
  CreatePricingSetupInput,
  PaymentMethod,
  LessonDuration,
} from "./pricingSetup.schema";

/**
 * Transforms form data for API submission
 * @param data - Raw form data
 * @returns Sanitized payload with pricing setup data
 */
export const mapPricingSetupFormData = (
  data: PricingSetupFormData
): CreatePricingSetupInput => {
  const payload: CreatePricingSetupInput = {
    paymentMethod: data.paymentMethod as PaymentMethod,
  };

  // Only include lesson rate and duration if payment method is "sonata"
  if (data.paymentMethod === "sonata") {
    if (data.lessonRate && data.lessonRate.trim() !== "") {
      const rate = parseFloat(data.lessonRate);
      if (!isNaN(rate) && rate > 0) {
        payload.lessonRate = rate;
      }
    }
    if (data.lessonDuration) {
      payload.lessonDuration = data.lessonDuration;
    }
  }

  return payload;
};

