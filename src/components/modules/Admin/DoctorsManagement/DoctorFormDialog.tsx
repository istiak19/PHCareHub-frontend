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

import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor";
import { ISpecialty } from "@/types/specialties";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

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
    const isEdit = !!doctor;

    const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
        doctor?.doctorSpecialties?.[0]?.specialities?.title || ""
    );

    const [gender, setGender] = useState<"MALE" | "FEMALE">(
        doctor?.gender || "MALE"
    );

    const [state, formAction, pending] = useActionState(
        isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
        null
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 dark:bg-neutral-900">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="dark:text-white">
                        {isEdit ? "Edit Doctor" : "Add New Doctor"}
                    </DialogTitle>
                </DialogHeader>

                <form action={formAction} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                        {/* Name */}
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Dr. John Doe"
                                defaultValue={isEdit ? doctor?.name : ""}
                            />
                            <InputFieldError state={state} field="name" />
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="doctor@example.com"
                                defaultValue={isEdit ? doctor?.email : ""}
                                disabled={isEdit}
                            />
                            <InputFieldError state={state} field="email" />
                        </Field>

                        {/* Passwords only for create */}
                        {!isEdit && (
                            <>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input id="password" name="password" type="password" />
                                    <InputFieldError state={state} field="password" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                    />
                                    <InputFieldError state={state} field="confirmPassword" />
                                </Field>
                            </>
                        )}

                        {/* Specialty */}
                        <Field>
                            <FieldLabel htmlFor="specialities">Specialty</FieldLabel>

                            {/* 🔹 Restored old defaultValue logic */}
                            {/* defaultValue={isEdit ? doctor?.doctorSpecialties?.[0]?.specialties?.title : ""} */}

                            <Input
                                id="specialities"
                                name="specialities"
                                type="hidden"
                                defaultValue={selectedSpecialty}
                            />

                            <Select
                                value={
                                    // 🔹 Restored previous logic
                                    // isEdit
                                    //   ? doctor?.doctorSpecialties?.[0]?.specialties?.title || ""
                                    //   : selectedSpeciality

                                    selectedSpecialty
                                }
                                onValueChange={setSelectedSpecialty}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a specialty" />
                                </SelectTrigger>

                                <SelectContent>
                                    {specialities?.length ? (
                                        specialities.map((s) => (
                                            <SelectItem key={s.id} value={s.title}>
                                                {s.title}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>
                                            No specialties available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>

                            <p className="text-xs text-muted-foreground mt-1">
                                Select a specialty for the doctor
                            </p>

                            <InputFieldError state={state} field="specialities" />
                        </Field>

                        {/* Contact */}
                        <Field>
                            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                            <Input
                                id="contactNumber"
                                name="contactNumber"
                                placeholder="+1234567890"
                                defaultValue={doctor?.contactNumber}
                            />
                            <InputFieldError state={state} field="contactNumber" />
                        </Field>

                        {/* Address */}
                        <Field>
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <Input
                                id="address"
                                name="address"
                                placeholder="123 Main St"
                                defaultValue={doctor?.address}
                            />
                            <InputFieldError state={state} field="address" />
                        </Field>

                        {/* Registration Number */}
                        <Field>
                            <FieldLabel htmlFor="registrationNumber">
                                Registration Number
                            </FieldLabel>
                            <Input
                                id="registrationNumber"
                                name="registrationNumber"
                                placeholder="REG123456"
                                defaultValue={doctor?.registrationNumber}
                            />
                            <InputFieldError state={state} field="registrationNumber" />
                        </Field>

                        {/* Experience */}
                        <Field>
                            <FieldLabel htmlFor="experience">Experience (years)</FieldLabel>
                            <Input
                                id="experience"
                                name="experience"
                                type="number"
                                min="0"
                                placeholder="5"
                                defaultValue={doctor?.experience}
                            />
                            <InputFieldError state={state} field="experience" />
                        </Field>

                        {/* Gender */}
                        <Field>
                            <FieldLabel htmlFor="gender">Gender</FieldLabel>
                            <Input id="gender" name="gender" type="hidden" defaultValue={gender} />

                            <Select
                                value={gender}
                                onValueChange={(val) => setGender(val as "MALE" | "FEMALE")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputFieldError state={state} field="gender" />
                        </Field>

                        {/* Appointment Fee */}
                        <Field>
                            <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
                            <Input
                                id="appointmentFee"
                                name="appointmentFee"
                                type="number"
                                min="0"
                                placeholder="100"
                                defaultValue={doctor?.appointmentFee}
                            />
                            <InputFieldError state={state} field="appointmentFee" />
                        </Field>

                        {/* Qualification */}
                        <Field>
                            <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
                            <Input
                                id="qualification"
                                name="qualification"
                                placeholder="MBBS, MD"
                                defaultValue={doctor?.qualification}
                            />
                            <InputFieldError state={state} field="qualification" />
                        </Field>

                        {/* Working Place */}
                        <Field>
                            <FieldLabel htmlFor="currentWorkingPlace">
                                Current Working Place
                            </FieldLabel>
                            <Input
                                id="currentWorkingPlace"
                                name="currentWorkingPlace"
                                placeholder="City Hospital"
                                defaultValue={doctor?.currentWorkingPlace}
                            />
                            <InputFieldError state={state} field="currentWorkingPlace" />
                        </Field>

                        {/* Designation */}
                        <Field>
                            <FieldLabel htmlFor="designation">Designation</FieldLabel>
                            <Input
                                id="designation"
                                name="designation"
                                placeholder="Senior Consultant"
                                defaultValue={doctor?.designation}
                            />
                            <InputFieldError state={state} field="designation" />
                        </Field>

                        {/* File (Only Create) */}
                        {!isEdit && (
                            <Field>
                                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                                <Input id="file" name="file" type="file" accept="image/*" />
                                <InputFieldError state={state} field="file" />
                            </Field>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-muted">
                        <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : isEdit ? "Update Doctor" : "Create Doctor"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DoctorFormDialog;