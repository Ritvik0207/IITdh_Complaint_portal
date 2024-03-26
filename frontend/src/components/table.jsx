import React from "react";

const Table = () => {
  return (
    <div className="flex justify-center items-center">
      {/* <aside className="sticky top-0 h-screen w-1/6 bg-gray-100 text-gray-800 p-4">
        <nav className="space-y-2">
          <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
            <span className="text-sm font-medium">Food</span>
          </button>
          <button className="w-full flex items-center space-x-2 bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-800">
            <span className="text-sm font-medium">Water</span>
          </button>
          <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
            <span className="text-sm font-medium">Electricity</span>
          </button>
          <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
            <span className="text-sm font-medium">Hostel Affairs</span>
          </button>
        </nav>
      </aside> */}

      <div className="flex relative w-5/6 overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b">
            <tr className="border-b transition-colors hover:bg-gray-50">
              <th className="h-12 px-4 text-left align-middle font-medium">
                Roll Number
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium w-[200px]">
                Subject
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                Label
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium justify-center">
                Photos
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                Upvotes
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="border-0">
            <tr className="border-b transition-colors hover:bg-gray-50">
              <td className="p-4 align-middle font-medium">Hostel Complaint</td>
              <td className="p-4 align-middle">CB.EN.U4CSE19001</td>
              <td className="p-4 align-middle">
                <div className="flex items-center space-x-2">
                  <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    Info
                  </div>
                  <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    Pending
                  </div>
                </div>
              </td>
              <td className="p-4 align-middle">Hostel</td>
              <td className="p-4 align-middle justify-center">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  Photos
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

{
  /* <div className="relative w-full overflow-auto">
  <table className="w-full caption-bottom text-sm">
    <thead className="[&amp;_tr]:border-b">
      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[200px]">
          Subject
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
          Roll Number
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
          Status
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
          Label
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 justify-center">
          Photos
        </th>
      </tr>
    </thead>
    <tbody className="[&amp;_tr:last-child]:border-0">
      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
          Hostel Complaint
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          CB.EN.U4CSE19001
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          <div className="flex items-center space-x-2">
            <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              Info
            </div>
            <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              Pending
            </div>
          </div>
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          Hostel
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 justify-center">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            Photos
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div> */
}
