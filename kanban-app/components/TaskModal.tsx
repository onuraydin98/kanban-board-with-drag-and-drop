import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import useListStore from "@stores/useListStore"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import generateId from "@utilities/generateId"
import { type PriorityType } from "@constants/tasks"
import type { DialogProps } from "@radix-ui/react-dialog"
import type { ListType } from "@/constants"

interface Props extends DialogProps {}

const formSchema = z
    .object({
        id: z.string().readonly(),
        summary: z
            .string()
            .min(5, {
                message: "Summary is too short!",
            })
            .max(100, {
                message: "Summary is too long!",
            }),
        weight: z.number().min(1, {
            message: "Weight of task must be minimum 1!",
        }),
        priority: z.custom<PriorityType>(),
        assignee: z
            .string()
            .min(1, {
                message: "At least 1 character!",
            })
            .max(12, {
                message: "Max of 12 character!",
            }),
        listType: z.custom<ListType>(),
    })
    .required({
        summary: true,
        weight: true,
        priority: true,
        assignee: true,
    })

const TaskModal = ({ open, onOpenChange }: Props) => {
    const addTask = useListStore(state => state.addTask)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            summary: "",
            priority: "LOW",
            weight: 1,
            assignee: "",
            listType: "backlog",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addTask({ ...values, id: generateId() })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add task</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-rows-3 gap-4 py-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="summary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Summary</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Task is about.."
                                                    className="resize-none dark:text-slate-50 dark:placeholder:text-slate-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="absolute" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem className="basis-1/2">
                                            <FormLabel>Priority</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Prio" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="LOW">
                                                        Low
                                                    </SelectItem>
                                                    <SelectItem value="MED">
                                                        Medium
                                                    </SelectItem>
                                                    <SelectItem value="HIGH">
                                                        High
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="listType"
                                    render={({ field }) => (
                                        <FormItem className="basis-1/2">
                                            <FormLabel>Add to</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Add to" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="backlog">
                                                        Backlog
                                                    </SelectItem>
                                                    <SelectItem value="todo">
                                                        Todo
                                                    </SelectItem>
                                                    <SelectItem value="done">
                                                        Done
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1"
                                                    type="number"
                                                    onChange={e =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    defaultValue={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage className="absolute max-w-[40%]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="assignee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assignee</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Alex"
                                                    onChange={field.onChange}
                                                    defaultValue={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage className="absolute" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="text-white dark:text-dark dark:focus-visible:outline-teal-600"
                                onSubmit={() => {
                                    onOpenChange!(false)
                                }}
                            >
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default TaskModal
