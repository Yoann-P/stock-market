import {Label} from "@/components/ui/label";
import {Controller} from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectField = (
    {
                         name,
                         label,
                         placeholder,
                         options,
                         control,
                         error,
                         required =false
}:SelectFieldProps) => {
    return (
        <div className={"space-y-2"}>
            <Label htmlFor={name} className={"form-label"}>{label}</Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please Select ${label.toLocaleLowerCase()}` : false
                }}
                render={({field}) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className={"text-white bg-gray-800 border-gra"}>
                            {options.map((option)=>(
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className={"on-focus:text-white on-focus:bg-gray-600"}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        {error && <p className={"text-sm text-red-500"}>{error.message}</p>}
                    </Select>
                )}
                />
        </div>
    )
}
export default SelectField
