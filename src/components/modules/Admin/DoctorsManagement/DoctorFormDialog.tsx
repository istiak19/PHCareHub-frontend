import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSpecialtySelection } from "@/hooks/specialtyHooks/useSpecialtySelection";
import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SpecialtyMultiSelect from "./SpecialtyMultiSelect";
import { IDoctor } from "@/types/doctor";
import { ISpecialty } from "@/types/specialties";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialities?: ISpecialty[];
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSuccess,
  doctor,
  specialities,
}: IDoctorFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!doctor;

  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    doctor?.gender || "MALE"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
    null
  );

  const handleClose = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (selectedFile) setSelectedFile(null);

    formRef.current?.reset();
    onClose();
  };

  const specialtySelection = useSpecialtySelection({
    doctor,
    isEdit,
    open,
  });

  const getSpecialtyTitle = (id: string): string => {
    return specialities?.find((s) => s.id === id)?.title || "Unknown";
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 dark:bg-gray-900 dark:text-gray-100">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="dark:text-white">
            {isEdit ? "Edit Doctor" : "Add New Doctor"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name" className="dark:text-gray-200">
                Name
              </FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.name || (isEdit ? doctor?.name : "")
                }
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email" className="dark:text-gray-200">
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.email || (isEdit ? doctor?.email : "")
                }
                disabled={isEdit}
              />
              <InputFieldError state={state} field="email" />
            </Field>

            {/* Password + Confirm Password */}
            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password" className="dark:text-gray-200">
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="dark:bg-gray-800 dark:text-gray-100"
                    defaultValue={state?.formData?.password || ""}
                  />
                  <InputFieldError state={state} field="password" />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="dark:text-gray-200"
                  >
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className="dark:bg-gray-800 dark:text-gray-100"
                    defaultValue={state?.formData?.confirmPassword || ""}
                  />
                  <InputFieldError state={state} field="confirmPassword" />
                </Field>
              </>
            )}

            {/* Specialty */}
            <SpecialtyMultiSelect
              selectedSpecialtyIds={specialtySelection.selectedSpecialtyIds}
              removedSpecialtyIds={specialtySelection.removedSpecialtyIds}
              currentSpecialtyId={specialtySelection.currentSpecialtyId}
              availableSpecialties={specialtySelection.getAvailableSpecialties(
                specialities!
              )}
              isEdit={isEdit}
              onCurrentSpecialtyChange={
                specialtySelection.setCurrentSpecialtyId
              }
              onAddSpecialty={specialtySelection.handleAddSpecialty}
              onRemoveSpecialty={specialtySelection.handleRemoveSpecialty}
              getSpecialtyTitle={getSpecialtyTitle}
              getNewSpecialties={specialtySelection.getNewSpecialties}
            />
            <InputFieldError field="specialties" state={state} />

            {/* Contact Number */}
            <Field>
              <FieldLabel
                htmlFor="contactNumber"
                className="dark:text-gray-200"
              >
                Contact Number
              </FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.contactNumber ||
                  (isEdit ? doctor?.contactNumber : "")
                }
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address" className="dark:text-gray-200">
                Address
              </FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.address || (isEdit ? doctor?.address : "")
                }
              />
              <InputFieldError state={state} field="address" />
            </Field>

            {/* Registration Number */}
            <Field>
              <FieldLabel
                htmlFor="registrationNumber"
                className="dark:text-gray-200"
              >
                Registration Number
              </FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.registrationNumber ||
                  (isEdit ? doctor?.registrationNumber : "")
                }
              />
              <InputFieldError state={state} field="registrationNumber" />
            </Field>

            {/* Experience */}
            <Field>
              <FieldLabel htmlFor="experience" className="dark:text-gray-200">
                Experience (in years)
              </FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                className="dark:bg-gray-800 dark:text-gray-100"
                min="0"
                defaultValue={
                  state?.formData?.experience ||
                  (isEdit ? doctor?.experience : "")
                }
              />
              <InputFieldError state={state} field="experience" />
            </Field>

            {/* Gender */}
            <Field>
              <FieldLabel htmlFor="gender" className="dark:text-gray-200">
                Gender
              </FieldLabel>
              <Input
                id="gender"
                name="gender"
                type="hidden"
                defaultValue={gender}
              />

              <Select
                value={gender}
                onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
              >
                <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>

              <InputFieldError state={state} field="gender" />
            </Field>

            {/* Appointment Fee */}
            <Field>
              <FieldLabel
                htmlFor="appointmentFee"
                className="dark:text-gray-200"
              >
                Appointment Fee
              </FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                min="0"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={isEdit ? doctor?.appointmentFee : undefined}
              />
              <InputFieldError state={state} field="appointmentFee" />
            </Field>

            {/* Qualification */}
            <Field>
              <FieldLabel
                htmlFor="qualification"
                className="dark:text-gray-200"
              >
                Qualification
              </FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.qualification ||
                  (isEdit ? doctor?.qualification : "")
                }
              />
              <InputFieldError state={state} field="qualification" />
            </Field>

            {/* Current Working Place */}
            <Field>
              <FieldLabel
                htmlFor="currentWorkingPlace"
                className="dark:text-gray-200"
              >
                Current Working Place
              </FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.currentWorkingPlace ||
                  (isEdit ? doctor?.currentWorkingPlace : "")
                }
              />
              <InputFieldError state={state} field="currentWorkingPlace" />
            </Field>

            {/* Designation */}
            <Field>
              <FieldLabel htmlFor="designation" className="dark:text-gray-200">
                Designation
              </FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                className="dark:bg-gray-800 dark:text-gray-100"
                defaultValue={
                  state?.formData?.designation ||
                  (isEdit ? doctor?.designation : "")
                }
              />
              <InputFieldError state={state} field="designation" />
            </Field>

            {/* Profile Photo */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file" className="dark:text-gray-200">
                  Profile Photo
                </FieldLabel>

                {selectedFile && (
                  <Image
                    src={
                      typeof selectedFile === "string"
                        ? selectedFile
                        : URL.createObjectURL(selectedFile)
                    }
                    alt="Profile Photo Preview"
                    width={50}
                    height={50}
                    className="mb-2 rounded-full"
                  />
                )}

                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="dark:bg-gray-800 dark:text-gray-100"
                />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Upload a profile photo for the doctor
                </p>

                <InputFieldError state={state} field="profilePhoto" />
              </Field>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
              className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              {pending
                ? "Saving..."
                : isEdit
                  ? "Update Doctor"
                  : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;