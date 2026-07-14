"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubscriptionSchema } from "@/lib/validation/subscription";
import type { Subscription } from "./subscriptions.client";
import { useCreateSubscription } from "./hooks/useCreateSubscription";
import { useUpdateSubscription } from "./hooks/useUpdateSubscription";

type SubscriptionFormInput = z.input<typeof SubscriptionSchema>;
type SubscriptionFormOutput = z.output<typeof SubscriptionSchema>;

type SubscriptionFormProps = {
  subscription?: Subscription;
  onSuccess: () => void;
  onCancel: () => void;
};

/**
 * SubscriptionForm — add/edit form for a subscription.
 * Args: subscription (optional, present when editing), onSuccess, onCancel callbacks.
 * Returns: form JSX; calls createSubscription or updateSubscription on submit depending on whether `subscription` was passed.
 */
export default function SubscriptionForm({
  subscription,
  onSuccess,
  onCancel,
}: SubscriptionFormProps) {
  const isEditing = !!subscription;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormInput, unknown, SubscriptionFormOutput>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: subscription
  ? {
      name: subscription.name,
      category: subscription.category,
      price: subscription.price,
      currency: subscription.currency,
      cycle: subscription.cycle,
      renewalDate: subscription.renewalDate.slice(0, 10),
      autoRenew: subscription.autoRenew,
      reminderDaysBefore: subscription.reminderDaysBefore,
      vendorUrl: subscription.vendorUrl ?? "",
      notes: subscription.notes ?? "",
    }
  : { cycle: "MONTHLY", autoRenew: true, reminderDaysBefore: 7 },

  });

  const { mutate: createSubscription, isPending: isCreating } = useCreateSubscription();
  const { mutate: updateSubscription, isPending: isUpdating } = useUpdateSubscription();
  const isPending = isCreating || isUpdating;

  function onSubmit(data: SubscriptionFormOutput) {
    if (subscription) {
      updateSubscription({ id: subscription.id, data }, { onSuccess });
    } else {
      createSubscription(data, { onSuccess });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} className="border px-2 py-1 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" {...register("category")} className="border px-2 py-1 w-full" />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input id="price" type="number" step="0.01" {...register("price")} className="border px-2 py-1 w-full" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="currency">Currency</label>
        <input id="currency" {...register("currency")} placeholder="USD" className="border px-2 py-1 w-full" />
        {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
      </div>

      <div>
        <label htmlFor="cycle">Billing cycle</label>
        <select id="cycle" {...register("cycle")} className="border px-2 py-1 w-full">
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
        {errors.cycle && <p className="text-red-500 text-sm">{errors.cycle.message}</p>}
      </div>

      <div>
        <label htmlFor="renewalDate">Renewal date</label>
        <input id="renewalDate" type="date" {...register("renewalDate")} className="border px-2 py-1 w-full" />
        {errors.renewalDate && <p className="text-red-500 text-sm">{errors.renewalDate.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input id="autoRenew" type="checkbox" {...register("autoRenew")} />
        <label htmlFor="autoRenew">Auto-renew</label>
      </div>

      <div>
        <label htmlFor="reminderDaysBefore">Remind me (days before renewal)</label>
        <input
          id="reminderDaysBefore"
          type="number"
          min={0}
          {...register("reminderDaysBefore")}
          className="border px-2 py-1 w-full"
        />
        {errors.reminderDaysBefore && (
          <p className="text-red-500 text-sm">{errors.reminderDaysBefore.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="vendorUrl">Vendor URL (optional)</label>
        <input
          id="vendorUrl"
          type="url"
          placeholder="https://netflix.com/account"
          {...register("vendorUrl")}
          className="border px-2 py-1 w-full"
        />
        {errors.vendorUrl && <p className="text-red-500 text-sm">{errors.vendorUrl.message}</p>}
      </div>



      <div>
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" {...register("notes")} rows={3} className="border px-2 py-1 w-full" />
        {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="border px-4 py-2">
          {isPending ? "Saving..." : isEditing ? "Save changes" : "Add subscription"}
        </button>
        <button type="button" onClick={onCancel} className="border px-4 py-2">
          Cancel
        </button>
      </div>
    </form>
  );
}
