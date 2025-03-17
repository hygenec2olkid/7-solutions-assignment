import { User } from "@/interface/user";

export function identifyUser(users: User[]) {
  const departments = users.reduce((acc, cur) => {
    const department = cur.company.department;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(cur);
    return acc;
  }, {} as Record<string, User[]>);

  return summaryDepartment(departments);
}

function summaryDepartment(d: Record<string, User[]>) {
  return Object.entries(d).reduce((acc, [department, users]) => {
    acc[department] = users.reduce((summary, cur) => {
      summary[cur.gender] = (summary[cur.gender] || 0) + 1;

      summary["bloodGroup"] = summary["bloodGroup"] || {};
      summary["bloodGroup"][cur.bloodGroup] =
        (summary["bloodGroup"][cur.bloodGroup] || 0) + 1;

      summary["eyeColor"] = summary["eyeColor"] || {};
      summary["eyeColor"][cur.eyeColor] =
        (summary["eyeColor"][cur.eyeColor] || 0) + 1;

      summary["hair"] = summary["hair"] || {};
      summary["hair"][cur.hair.color] =
        (summary["hair"][cur.hair.color] || 0) + 1;

      summary["country"] = summary["country"] || {};
      summary["country"][cur.address.country] =
        (summary["country"][cur.address.country] || 0) + 1;

      summary["role"] = summary["role"] || {};
      summary["role"][cur.role] = (summary["role"][cur.role] || 0) + 1;

      summary["addressUser"] = summary["addressUser"] || {};
      summary["addressUser"][cur.firstName + cur.lastName] =
        cur.address.postalCode;

      return summary;
    }, {} as Record<string, any>);

    return acc;
  }, {} as Record<string, any>);
}
