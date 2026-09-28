import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';

export default function FormTestPage() {
  return (
    <div className='mx-auto flex max-w-2xl flex-col gap-6 p-10'>
      <FormField label='Event Name' htmlFor='name'>
        <Input id='name' placeholder='e.g., Fall Club Meeting' />
      </FormField>

      <FormField label='Date' htmlFor='date' required helperText='Shown on the calendar'>
        <Input id='date' placeholder='MM/DD/YYYY' required />
      </FormField>

      <FormField label='Location' htmlFor='loc' error='Location is required'>
        <Input id='loc' aria-invalid />
      </FormField>

      <FormField label='Disabled' htmlFor='dis'>
        <Input id='dis' placeholder="Can't edit this" disabled />
      </FormField>

      <FormField label='Time' htmlFor='start'>
        <div className='flex gap-3'>
          <Input id='start' placeholder='Start' />
          <Input placeholder='End' aria-label='End time' />
        </div>
      </FormField>

      <FormField label='Event Type' htmlFor='type'>
        <Select id='type' placeholder='Select type'>
          <option value='meeting'>Meeting</option>
          <option value='social'>Social</option>
          <option value='fundraising'>Fundraising</option>
        </Select>
      </FormField>

      <FormField label='Description' htmlFor='desc'>
        <TextArea id='desc' placeholder='Add a brief description for attendees…' />
      </FormField>
    </div>
  );
}
