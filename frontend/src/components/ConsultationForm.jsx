import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SERVICE_INTERESTS } from "@/data/services";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const initialState = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone: "",
  service: "Estate Planning — Wills",
  preferred_date: "",
  preferred_time: "",
  meeting_type: "In-person",
  message: "",
};

export default function ConsultationForm({ compact = false }) {
  const [form, setForm] = useState(initialState);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        preferred_date: date ? format(date, "yyyy-MM-dd") : "",
      };
      await axios.post(`${API}/consultations`, payload);
      setSuccess(true);
      toast.success("Thank you! Your consultation request was received.");
      setForm(initialState);
      setDate(null);
    } catch (err) {
      const detail = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-10 text-center" data-testid="consultation-success">
        <CheckCircle2 className="w-14 h-14 text-[#15803D] mx-auto" />
        <h3 className="mt-4 text-2xl font-[Outfit] font-semibold text-[#0F172A]">Request received</h3>
        <p className="mt-3 text-lg text-[#334155] leading-relaxed">
          Thank you. Katrina will personally review your details and reach out within one business day to confirm your appointment.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-md font-semibold"
          data-testid="consultation-success-again"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-[#CBD5E1] rounded-xl shadow-sm ${compact ? "p-6 md:p-8" : "p-8 md:p-10"}`}
      data-testid="consultation-form"
    >
      <div className="grid md:grid-cols-3 gap-5">
        <Field label="First Name *" testid="field-first">
          <input
            value={form.first_name}
            onChange={(e) => set("first_name", e.target.value)}
            className={inputCls}
            data-testid="input-first-name"
            required
          />
        </Field>
        <Field label="Middle Name" testid="field-middle">
          <input
            value={form.middle_name}
            onChange={(e) => set("middle_name", e.target.value)}
            className={inputCls}
            data-testid="input-middle-name"
          />
        </Field>
        <Field label="Last Name *" testid="field-last">
          <input
            value={form.last_name}
            onChange={(e) => set("last_name", e.target.value)}
            className={inputCls}
            data-testid="input-last-name"
            required
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <Field label="Email *" testid="field-email">
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls}
            placeholder="you@example.com"
            data-testid="input-email"
            required
          />
        </Field>
        <Field label="Phone" testid="field-phone">
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls}
            placeholder="(520) 555-0123"
            data-testid="input-phone"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="I am interested in information about *" testid="field-service">
          <Select value={form.service} onValueChange={(v) => set("service", v)}>
            <SelectTrigger className="h-14 text-lg border-2 border-[#CBD5E1] bg-white" data-testid="select-service">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_INTERESTS.map((name) => (
                <SelectItem key={name} value={name} className="text-base py-2" data-testid={`service-option-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <Field label="Choose Date" testid="field-date">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                data-testid="open-date-picker"
                className={`${inputCls} h-14 inline-flex items-center justify-between text-left`}
              >
                <span className={date ? "text-[#0F172A]" : "text-[#94A3B8]"}>
                  {date ? format(date, "MM/dd/yyyy") : "mm/dd/yyyy"}
                </span>
                <CalendarIcon className="w-5 h-5 text-[#1E3A8A]" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field label="Choose Time" testid="field-time">
          <Select value={form.preferred_time} onValueChange={(v) => set("preferred_time", v)}>
            <SelectTrigger className="h-14 text-lg border-2 border-[#CBD5E1] bg-white" data-testid="select-time">
              <SelectValue placeholder="--:-- --" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t} className="text-base py-2">{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Meeting Type" testid="field-meeting">
          <RadioGroup
            value={form.meeting_type}
            onValueChange={(v) => set("meeting_type", v)}
            className="flex flex-wrap gap-4 mt-1"
          >
            {["In-person", "Zoom Meeting"].map((opt) => (
              <label
                key={opt}
                htmlFor={`meeting-${opt}`}
                className={`cursor-pointer inline-flex items-center gap-3 border-2 rounded-md px-5 py-3 transition-colors ${
                  form.meeting_type === opt
                    ? "border-[#1E3A8A] bg-[#EFF4FB]"
                    : "border-[#CBD5E1] hover:border-[#94A3B8]"
                }`}
              >
                <RadioGroupItem value={opt} id={`meeting-${opt}`} data-testid={`radio-${opt.replace(/\s+/g, '-').toLowerCase()}`} />
                <span className="text-base font-medium text-[#0F172A]">{opt}</span>
              </label>
            ))}
          </RadioGroup>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tell us a little more (optional)" testid="field-message">
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${inputCls} min-h-[120px] leading-relaxed`}
            placeholder="Type here…"
            data-testid="input-message"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        data-testid="consultation-submit"
        className="mt-7 w-full md:w-auto inline-flex items-center justify-center bg-[#1E3A8A] text-white hover:bg-[#1E40AF] disabled:opacity-60 px-8 py-4 rounded-md font-semibold text-lg transition-colors"
      >
        {loading ? "Submitting…" : "Request Free Consultation"}
      </button>
      <p className="mt-3 text-sm text-[#64748B]">By submitting, you agree to be contacted regarding your request. We never share your information.</p>
    </form>
  );
}

const inputCls =
  "w-full border-2 border-[#CBD5E1] rounded-md px-4 py-3 text-lg bg-white focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none transition-colors";

function Field({ label, children, testid }) {
  return (
    <label className="block" data-testid={testid}>
      <span className="block text-base md:text-lg font-medium text-[#0F172A] mb-2">{label}</span>
      {children}
    </label>
  );
}
