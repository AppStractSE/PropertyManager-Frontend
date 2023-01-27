import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Client, TeamMemberResponseDto } from "../api/client";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  const { currentUser } = useUser();
  const client = new Client();
  console.log(currentUser.userId);

  const { data: teamMembers, isLoading: teamMembersLoading } = useQuery<TeamMemberResponseDto[]>(
    ["teamMembers", currentUser.userId],
    async () => client.teamMember_GetTeamMembersByUserId(currentUser.userId!),
  );
  if (!teamMembersLoading) console.log(teamMembers);

  // const { data: team } = useQuery<TeamResponseDto>(["team", customer.teamId], async () =>
  //   client.team_GetTeamById(customer.teamId!),
  // );

  // const [searchValue, setSearchValue] = useState("");
  // const fetchCustomers = useAxios({ url: "/Customer", method: "get" });
  // const { data, error, isLoading } = useQuery<CustomerResponseDto[]>("customers", fetchCustomers);
  // const filterSearch = data?.filter((customer) =>
  //   customer.name.toLowerCase().includes(searchValue.toLowerCase()),
  // );
  // console.log(currentUser.userId);

  // if (isLoading || filterSearch === undefined || error) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       transition={{ duration: 0.5, ease: "easeInOut" }}
  //     >
  //       <HomePageSkeleton />
  //     </motion.div>
  //   );
  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      asd
      {/* <Container className='mt-3 mb-3'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='vstack gap-2 minBreakpoint-xs'
        >
          <div className='h3 mb-0'>Mina kunder</div>
          <p>{currentUser.displayName}</p>
          <SearchAndFilter
            value={searchValue}
            onChange={setSearchValue}
            filterSearch={filterSearch.length}
          />
          {filterSearch.map((customer) => (
            <motion.div variants={item} key={customer.id}>
              <CustomerCard customer={customer} />
            </motion.div>
          ))}
        </motion.div>
      </Container> */}
    </motion.div>
  );
};

export default Home;
