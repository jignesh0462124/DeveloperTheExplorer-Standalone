import { serve } from "https://deno.land/std@0.177.0/http/server.js";
import Razorpay from "https://esm.sh/razorpay@2.9.2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const body = await req.json();

    const {
      user_id,
      full_name,
      email,
      phone,
      college,
      gender,
      amount,
    } = body;

    // ✅ FIXED: create Supabase Admin client INSIDE the function
    const supabase = createClient(
      Deno.env.get("PROJECT_URL"),
      Deno.env.get("SERVICE_ROLE_KEY")
    );

    // STEP 1 — save pending booking
    const { data: booking, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        user_id,
        full_name,
        email,
        phone,
        college,
        gender,
        amount,
        payment_status: "pending",
      })
      .select()
      .single();

    if (insertErr) throw insertErr;

    // STEP 2 — Create Razorpay order
    const razorpay = new Razorpay({
      key_id: Deno.env.get("RAZERPAY_KEY_ID"),
      key_secret: Deno.env.get("RAZERPAY_SECRET"),
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: booking.id,
    });

    // STEP 3 — store order ID
    await supabase
      .from("bookings")
      .update({ razorpay_order_id: order.id })
      .eq("id", booking.id);

    return new Response(
      JSON.stringify({
        key: Deno.env.get("RAZERPAY_KEY_ID"),
        order,
        booking_id: booking.id,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
});
