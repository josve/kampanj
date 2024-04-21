import SectionHeader from '@/components/SectionHeader';
import SectionContent from '@/components/SectionContent';
import { getDictionary } from '@/app/languages';
import { Input, Switch, Button } from 'antd';
import EditDialog from '@/components/EditDialog';

interface Args {
  locale: string;
  event: any;
}

const EditSection: FunctionComponent<Args> = async ({
  locale,
  event,
}: Args) => {
  const dictionary = await getDictionary(locale);

  const w = dictionary['EditEvent'];

  const clientEvent = {
    ...event,
    id: event._id.toString(),
    _id: event._id.toString(),
  };

  return (
    <>
      <SectionHeader
        imagePath="/images/icon_instruction_white.png"
        translations={w}
      ></SectionHeader>
      <SectionContent>
        <EditDialog event={clientEvent} translations={w} locale={locale} />
      </SectionContent>
    </>
  );
};

export default EditSection;
