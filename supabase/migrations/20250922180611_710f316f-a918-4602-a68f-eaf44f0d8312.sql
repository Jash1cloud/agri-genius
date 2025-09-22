-- Create equipment_requests table for farmers to post what they need
CREATE TABLE public.equipment_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  budget_per_day NUMERIC,
  required_date DATE NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 1,
  is_fulfilled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.equipment_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for equipment_requests
CREATE POLICY "Anyone can view active requests" 
ON public.equipment_requests 
FOR SELECT 
USING (is_fulfilled = false OR auth.uid() = farmer_id);

CREATE POLICY "Users can create their own requests" 
ON public.equipment_requests 
FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Users can update their own requests" 
ON public.equipment_requests 
FOR UPDATE 
USING (auth.uid() = farmer_id);

CREATE POLICY "Users can delete their own requests" 
ON public.equipment_requests 
FOR DELETE 
USING (auth.uid() = farmer_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_equipment_requests_updated_at
BEFORE UPDATE ON public.equipment_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();