import Spinner from '../../ui/Spinner';
import type { CabinType } from '../../types';
import CabinRow from './CabinRow';
import useGetCabins from './hooks/useGetCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import useCabinFiltersAndSort from './hooks/useCabinFiltersAndSort';
import Empty from '../../ui/Empty';

export default function CabinTable() {
   const { cabins, isGettingCabins } = useGetCabins();
   const processedCabins = useCabinFiltersAndSort(cabins);
   if (isGettingCabins) return <Spinner />;
   if (!processedCabins?.length) return <Empty resource="cabins" />;

   return (
      <Menus>
         <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
               <div></div>
               <div>Cabin</div>
               <div>Capacity</div>
               <div>Price</div>
               <div>Discount</div>
               <div></div>
            </Table.Header>
            <Table.Body
               data={processedCabins}
               render={(cabin: CabinType) => (
                  <CabinRow cabin={cabin} key={cabin.id} />
               )}
            />
         </Table>
      </Menus>
   );
}
