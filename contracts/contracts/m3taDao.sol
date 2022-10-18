// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.11 <0.9.0;
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/ITablelandController.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./utils/SQLHelpers.sol";
import "./Ownable.sol";
import "./IValist.sol";

contract m3taDao is
    Ownable
{


                                    //     @@@@@  @@@@@    @@@@@@@  @@@@@@@   @@@@@@   @@@@@@@      @@@@@@     @@@@@@@    \\
                                    //    @@@@@@@@@@@@@@   @@@@@@@  @@@@@@@  @@@@@@@@  @@@@@@@@    @@@@@@@@   @@@@@@@@@   \\
                                    //    @@!  @@@@  @@@       !!@    @@@    @@!  @@@  @@    @@@   @@!  @@@  @@@     @@@  \\
                                    //    !@!  !@!@  @!@       !!@    @@@    !@!  @!@  @@     @@@  !@!  @!@  !@!     @!@  \\
                                    //    !@!  @!@!  !@!   @@@@!!@    @@@    @!@!@!@!  @@     @@@  @!@!@!@!  @!@     !@!  \\
                                    //    !!!  !!!!  !!!   @@@@!!@    @@@    !!!@!!!!  @@     @@@  !!!@!!!!  !!!     !!!  \\
                                    //    !!:  !!!!  !!!       !!@    @!@    !!:  !!!  @@     @@@  !!:  !!!  !!:     !!!  \\
                                    //    :!:  :!:!  !:!       !!@    @@@    :!:  !:!  @@    @@@   :!:  !:!  :!:     !:!  \\  
                                    //    :::  ::::  :::   @@@@@@@    @@@    ::   :::  @@   @@@    :::  :::  @@@@@@@@@@   \\
                                    //    :::  ::::  :::   @@@@@@@    @@@    ::   :::  @@@@@@@     :::  : :    @@@@@@@    \\

//  @@@  @@@   @@@@@@   @@@       @@@   @@@@@@   @@@@@@@    @@       @@   @@@@@@@   @@@@@@   @@@@@@@   @@@      @@@ ::::  @@@       @@@@@@   @@@       @@@  @@@@@@@     \\
//  @@@  @@@  @@@@@@@@  @@@       @@@  @@@@@@@   @@@@@@@     @@     @@    @@@@@@@  @@@@@@@@  @@@@@@@@  @@@      @@@ ::::  @@@      @@@@@@@@  @@@::     @@@  @@@@@@@@    \\
//  @@!  @@@  @@!  @@@  @@!       @@!  !@@         @@!        @@   @@       @@@    @@!  @@@  @@@   @@  @@!      @@!       @@@      @@!  @@@  @@! ::    @@!  @@    @@@   \\
//  !@!  @!@  !@!  @!@  !@!       !@!  !@!         !@!         @@ @@        @@@    !@!  @!@  @@@   @@  !@!      !@!       @@@      !@!  @!@  !@!  ::   !@!  @@     @@@  \\
//  @!@  !@!  @!@!@!@!  @!!       !!@  !!@@!!      @!!         @@@@         @@@    @!@!@!@!  @@@@@@@@  @!!      @!! ::::  @@@      @!@!@!@!  @!!   ::  @!!  @@     @@@  \\
//  !@!  !!!  !!!@!!!!  !!!       !!!   !!@!!!     !!!         @@@@         @@@    !!!@!!!!  @@@@@@@@  !!!      !!! ::::  @@@      !!!@!!!!  !!!    :: !!!  @@     @@@  \\
//  :!:  !!:  !!:  !!!  !!:       !!:       !:!    !!:        @@  @@        @!@    !!:  !!!  @@@   @@  !!:      !!:       @@@      !!:  !!!  !!:     ::!!:  @@     @@@  \\
//   ::!!:!   :!:  !:!   :!:      :!:      !:!     :!:       @@    @@       @@@    :!:  !:!  @@@   @@  :!:      :!:       @@@      :!:  !:!  :!:      :::!  @@    @@@   \\
//    ::::    ::   :::   :: ::::  :::  :::: ::      ::      @@      @@      @@@    ::   :::  @@@@@@@@  :: ::::  ::: ::::  @@@@@@@  ::   :::  ::        :::  @@   @@@    \\
//     :       :   : :  : :: : :  :::  :: : :       :      @@        @@     @@@    ::   :::  @@@@@@@   :: ::::  ::: ::::  @@@@@@@   :   : :  ::         ::  @@@@@@@     \\
    
    using Counters for Counters.Counter;

    mapping(address => bool) private profileExists;
    mapping(uint => bool) private OrganizationExists;

    Counters.Counter private profileID;
    Counters.Counter private ValistID;
    Counters.Counter private hireID;
    Counters.Counter private proposalID;
    IValist          private valistRegistryContract;
    ITablelandTables private tablelandContract;

    string  private _baseURIString;

    string  private _OrganizationTable;
    uint256 private _OrganizationTableId;
    string private constant M3TADAO_ORGANIZATION_PREFIX = "m3ta_organization";
    string private constant ORGANIZATION_SCHEMA = "founderAddress text, identifier text, OrganizationID text, groupID text, OrganizationHex text, OrganizationName text, imageURI text, description text";

    string  private _UserTable;
    uint256 private _UserTableId;
    string private constant M3TADAO_PROFILE_PREFIX = "m3ta_profile";
    string private constant PROFILE_SCHEMA = "userAddress text, identifier text, userDID text, userName text, imageURI text, description text";

    string  private _ProposalTable;
    uint256 private _proposalTableID;
    string private constant PROPOSAL_PREFIX = "m3ta_proposal";
    string private constant PROPOSAL_SCHEMA = "proposalid text, accountid text, proposer text, body text";

    string  private _VotingTable;
    uint256 private _votingTableID;
    string private constant VOTES_PREFIX = "m3ta_vote";
    string private constant VOTES_SCHEMA = "proposalid text, accountid text, respondent text, vote text";
        // Tableland Hiring table variables

    string  private _hireTable;
    uint256 private _hiringTableId;
    string private constant HIRE_PREFIX = "m3ta_hire";
    string private constant HIRE_SCHEMA ="hireID text, profAddress text, accountid text, hireTitle text, hireDescription text";
    

    string[] private tableNames;

    address private constant valistLicenceNFTs = 0x3cE643dc61bb40bB0557316539f4A93016051b81;

// 0xD504d012D78B81fA27288628f3fC89B0e2f56e24
    constructor(IValist ValistRegistryContract )
    {
        //@dev setting the external valist contract
        valistRegistryContract = ValistRegistryContract;

        // Creating the M3taDao Tableland Tables on the constructor
        _baseURIString = "https://testnet.tableland.network/query?s=";

        tablelandContract = TablelandDeployments.get();

        // Create m3tadao organizations table.
        _OrganizationTableId = tablelandContract.createTable(
            address(this),
            SQLHelpers.toCreateFromSchema(ORGANIZATION_SCHEMA  , M3TADAO_ORGANIZATION_PREFIX)
        );

        _OrganizationTable = SQLHelpers.toNameFromId(M3TADAO_ORGANIZATION_PREFIX, _OrganizationTableId);
        // Create m3tadao users profile table.
        _UserTableId = tablelandContract.createTable(
            address(this),
            SQLHelpers.toCreateFromSchema(PROFILE_SCHEMA, M3TADAO_PROFILE_PREFIX)
        );

        _UserTable = SQLHelpers.toNameFromId(M3TADAO_PROFILE_PREFIX, _UserTableId);

        // Create proposals table for organizations.
        _proposalTableID = tablelandContract.createTable(
            address(this),
            SQLHelpers.toCreateFromSchema(PROPOSAL_SCHEMA, PROPOSAL_PREFIX)
        );

        _ProposalTable = SQLHelpers.toNameFromId(PROPOSAL_PREFIX, _proposalTableID);

        // Create voting table on top of proposals.
        _votingTableID = tablelandContract.createTable(
            address(this),
            SQLHelpers.toCreateFromSchema(VOTES_SCHEMA , VOTES_PREFIX)
        );

        _VotingTable = SQLHelpers.toNameFromId(VOTES_PREFIX, _votingTableID);

        // Create hiring table for users to join organizations.
        _hiringTableId = tablelandContract.createTable(
            address(this),
            SQLHelpers.toCreateFromSchema(HIRE_SCHEMA, HIRE_PREFIX)
           
        );

        _hireTable = SQLHelpers.toNameFromId(HIRE_PREFIX, _hiringTableId);


    }

        // Function for creating posts for an Organization 
    function indexProfile(string memory profiledid , string memory userName , string memory imageURI , string memory description) public {
        // only one profile per address
        require(profileExists[msg.sender] == false , "only one profile per address");

        profileExists[msg.sender] = true;

        profileID.increment();

        string memory statement =
        SQLHelpers.toInsert(
                M3TADAO_PROFILE_PREFIX,
                _UserTableId,
                "userAddress, identifier, userDID, userName, imageURI, description",
                string.concat(
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(Strings.toString(profileID.current())),
                    ",",
                    SQLHelpers.quote(profiledid),
                    ",",
                    SQLHelpers.quote(userName),
                    ",",
                    SQLHelpers.quote(imageURI),
                    ",",
                    SQLHelpers.quote(description)
                )
            );
        runSQL(_UserTableId,statement);      
    }       
        
    

    // Creating a Valist Organization/Organization
    function indexProjectOrganization(uint OrganizationID, string memory groupID, string memory OrganizationName , string memory imageURI , string memory description)
        public  
    {
        require(isOrganizationMember(OrganizationID,msg.sender) && OrganizationExists[OrganizationID] == false);

        string memory OrganizationHex = Strings.toHexString(OrganizationID);

        ValistID.increment();

        string memory statement =
        SQLHelpers.toInsert(
                M3TADAO_ORGANIZATION_PREFIX,
                _OrganizationTableId,
                "founderAddress, identifier, OrganizationID, groupID, OrganizationHex, OrganizationName, imageURI, description",
                string.concat(
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(Strings.toString(ValistID.current())),
                    ",",
                    SQLHelpers.quote(Strings.toString(OrganizationID)),
                    ",",
                    SQLHelpers.quote(groupID),
                    ",",
                    SQLHelpers.quote(OrganizationHex),
                    ",",
                    SQLHelpers.quote(OrganizationName),
                    ",",
                    SQLHelpers.quote(imageURI),
                    ",",
                    SQLHelpers.quote(description)
                )
            );
        runSQL(_OrganizationTableId,statement);      
    }

    function Proposal(
            uint256 accountID,
            string memory proposal_CID
        ) external {

            require(
                IERC1155(valistLicenceNFTs).balanceOf(msg.sender,accountID) > 0 || isOrganizationMember(accountID,msg.sender),
                "sender is not token owner OR organization Member"
            );
            proposalID.increment();
            string memory statement =
                SQLHelpers.toInsert(
                    PROPOSAL_PREFIX,
                    _proposalTableID,
                    "proposalid, accountid, proposer, body",
                    string.concat(
                        SQLHelpers.quote(Strings.toString(proposalID.current())),
                        ",",
                        SQLHelpers.quote(Strings.toString(accountID)),
                        ",",
                        SQLHelpers.quote(Strings.toHexString(msg.sender)),
                        ",",
                        SQLHelpers.quote(proposal_CID)
                    )
                );
                runSQL(_proposalTableID,statement);      

            
    }

    function Vote(
        uint256 proposalid,
        uint256 accountID,
        bool vote
    ) external {

        require(
            IERC1155(valistLicenceNFTs).balanceOf(msg.sender,accountID) > 0,
            "sender is not token owner"
        );
        string memory statement =
            SQLHelpers.toInsert(
                VOTES_PREFIX,
                _votingTableID,
                "proposalid, accountid, respondent, vote",
                string.concat(
                    SQLHelpers.quote(Strings.toString(proposalid)),
                    ",",
                    SQLHelpers.quote(Strings.toString(accountID)),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    vote ? "'1'" : "'0'"
                )
            );
            runSQL(_votingTableID,statement);      

        
    }

     function createHiringRequest(uint accountID , string memory hireTitle , string memory hireDescription) public  {

        // Only M3taDao Users can make a Hire request to an Organization
        require(
            profileExists[msg.sender] == true,
            "only m3taDao users can create a Hiring Request"
        );

        hireID.increment();

        string memory statement =
            SQLHelpers.toInsert(
                HIRE_PREFIX,
                _hiringTableId,
                "hireID, profAddress, accountid, hireTitle, hireDescription",
                string.concat(
                    SQLHelpers.quote(Strings.toString(hireID.current())),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(Strings.toString(accountID)),
                    ",",
                    SQLHelpers.quote(hireTitle),
                    ",",
                    SQLHelpers.quote(hireDescription)
                )
            );
            runSQL(_hiringTableId,statement); 

    }

    function rejectHiringRequest(uint accountID, uint256 hireId) public {
        require(isOrganizationMember(accountID,msg.sender) , "Only post creators and account members can Reject a Hiring Request");

        string memory filter = string.concat("hireID=",Strings.toString(hireId));

        string memory statement = SQLHelpers.toDelete(HIRE_PREFIX, _hiringTableId, filter);

         runSQL(_hiringTableId,statement);
        
    }

    // Function to make Insertions , Updates and Deletions to our Tableland Tables 
    function runSQL(uint256 tableID, string memory statement) private{
         tablelandContract.runSQL(
            address(this),
            tableID,
            statement        
        );
    }


    function organizationTableURI() 
    public view returns (string memory) {
        return string.concat(
            _baseURI(), 
            "SELECT%20*%20FROM%20",
            _OrganizationTable
        );
    }

    function profileTableURI() 
    public view returns (string memory) {
        return string.concat(
            _baseURI(), 
            "SELECT%20*%20FROM%20",
            _UserTable
        );
    }
    
    function proposalTableURI() 
    public view returns (string memory) {
        return string.concat(
            _baseURI(), 
            "SELECT%20*%20FROM%20",
            _ProposalTable
        );
    }    

    function voteTableURI() 
    public view returns (string memory) {
        return string.concat(
            _baseURI(), 
            "SELECT%20*%20FROM%20",
            _VotingTable
        );
    }    
    
    function hireTableURI() 
    public view returns (string memory) {
        return string.concat(
            _baseURI(), 
            "SELECT%20*%20FROM%20",
            _hireTable
        );
    }

    function _baseURI() internal view returns (string memory) {
        return _baseURIString;
    }
    // Setting tableland BaseUri for future updates!!!
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseURIString = baseURI;
    }


    function isOrganizationMember(uint _OrganizationID,address member) internal view returns (bool) {
       return  valistRegistryContract.isAccountMember(_OrganizationID,member);
    }

}