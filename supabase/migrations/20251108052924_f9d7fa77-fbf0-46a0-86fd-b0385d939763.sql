-- Drop the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Allow users to see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow viewing profiles of equipment owners when browsing equipment
CREATE POLICY "View equipment owner profiles" ON public.profiles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.equipment 
      WHERE equipment.owner_id = profiles.user_id 
      AND equipment.is_available = true
    )
  );

-- Allow viewing profiles in active transactions
CREATE POLICY "View transaction participant profiles" ON public.profiles
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.borrowing_transactions
      WHERE (borrowing_transactions.borrower_id = auth.uid() OR borrowing_transactions.owner_id = auth.uid())
      AND (borrowing_transactions.borrower_id = profiles.user_id OR borrowing_transactions.owner_id = profiles.user_id)
    )
  );