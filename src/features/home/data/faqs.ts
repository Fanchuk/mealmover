export interface Faq {
  id: string;
  tab: string;
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  { id: "gen-1", tab: "GENERAL", question: "Do you charge per hour our per project rate?", answer: "MealMover does not charge an hourly rate. You pay for the order: the cost of dishes + a fixed delivery fee based on the distance to the restaurant." },
  { id: "gen-2", tab: "GENERAL", question: "Can I have the plan for one package or any bundling?", answer: "Yes, the app features combo meals from restaurants and a MealMover+ subscription that provides free delivery for orders over $20." },
  { id: "gen-3", tab: "GENERAL", question: "Can I consult first when I feel confused what should I choose?", answer: "Of course. The built-in AI assistant will select a dish based on your mood, budget, and dietary restrictions.\n\nIf you need a human — support is available 24/7 via chat and phone." },
  { id: "gen-4", tab: "GENERAL", question: "Can I have any revision if the work unexpectedly?", answer: "If something goes wrong with your order — let us know within 30 minutes of delivery, and we will refund you or arrange a free replacement delivery." },

  { id: "trans-1", tab: "TRANSACTION", question: "Where can I see my previous orders?", answer: "All orders are stored in the Transaction History section, complete with the receipt, delivery details, and a reorder button." },
  { id: "trans-2", tab: "TRANSACTION", question: "Can I cancel an order after payment?", answer: "Yes, as long as the restaurant hasn't started preparing it. After the Preparing status, cancellations must be coordinated with support." },

  { id: "pay-1", tab: "PAYMENTS", question: "Which payment methods are supported?", answer: "Credit Card (Stripe), cash to the courier, and PayPal. Card details are not stored on our servers." },
  { id: "pay-2", tab: "PAYMENTS", question: "How do promo codes work?", answer: "Enter the code in the cart. The discount applies to the food total — delivery and service fees are not discounted." },

  { id: "ret-1", tab: "RETURNS", question: "What if my food arrives cold or damaged?", answer: "Send a photo to the support chat within 30 minutes. Refunds to your card take 3-5 business days." },
  { id: "ret-2", tab: "RETURNS", question: "Do you refund delivery costs?", answer: "Yes, if the delay exceeds 20 minutes from the promised time due to the service's fault." },

  { id: "car-1", tab: "CAREERS", question: "How can I become a courier?", answer: "Fill out the Join Courier form: you'll need documents, a vehicle, and a thermal bag. Verification takes up to 3 days." },
  { id: "car-2", tab: "CAREERS", question: "How do restaurants join MealMover?", answer: "Via the Join Merchant form. A manager will contact you within 24 hours, onboarding is free." },
];