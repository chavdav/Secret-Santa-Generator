package com.temporary.santa.generator;

import java.util.*;
import java.util.Map.Entry;

import static java.lang.Math.random;

public class SecretSantaGenerator {

    public static void main(String[] args) {
        List<Person> persons = new ArrayList<Person>();

        Scanner sc = new Scanner(System.in);

        boolean more = true;
        while (more) {
            more = addPerson(persons, sc.nextLine());
        }

        List<Person> originalPersons = new ArrayList<Person>(persons);

        randomize(persons);

        Map<Person, Person> assignments = assign(originalPersons, persons);
        assignments = validateAndAdjust(assignments);

        for(Entry<Person, Person> entry : assignments.entrySet()) {
            System.out.println(entry.getKey() + " => " + encode(entry.getValue()));
        }
        System.out.println(assignments.toString());
    }

    private static String encode(Person value) {
        return "https://www.base64decode.org/dec/" + Base64.getEncoder().encodeToString(value.name.getBytes());
    }


    private static Map<Person, Person> validateAndAdjust(Map<Person, Person> assignments) {
        Person key;
        while((key = validate(assignments)) != null) {
            adjust(assignments, key);
        }
        return assignments;
    }

    private static void adjust(Map<Person, Person> assignments, Person key) {
        Person value  = assignments.get(key);

        for(Entry<Person, Person> entry : assignments.entrySet()) {
            if (validate(key, entry.getValue()) && validate(entry.getKey(), value)) {
                swap(assignments, key, entry.getKey());
                return;
            }
        }

    }

    private static Person validate(Map<Person, Person> assignments) {
        for(Entry<Person, Person> entry : assignments.entrySet()) {
            if(!validate(entry.getKey(), entry.getValue())) {
                return entry.getKey();
            }
        }
        return null;
    }

    private static void swap(Map<Person, Person> finalAssignments, Person p1, Person p2) {
        Person temp = finalAssignments.get(p1);
        Person temp2 = finalAssignments.get(p2);
        finalAssignments.put(p1, temp2);
        finalAssignments.put(p2, temp);
    }

    private static boolean validate(Person p1, Person p2) {
        for (String group : p1.groups) {
            for(String group2: p2.groups) {
                if (group.equals(group2)) {
                    return false;
                }
            }
        }
        return true;
    }


    private static Map<Person, Person> assign(List<Person> originalPersons, List<Person> persons) {
        Map<Person, Person> map = new HashMap();

        Iterator<Person> iter = originalPersons.iterator();
        for (int i = 0; iter.hasNext(); i++) {
            map.put(iter.next(), persons.get(i));
        }

        return map;
    }

    private static void randomize(List<Person> persons) {
        for (int i = 0; i < persons.size(); i++) {
            swap(persons, i, (int) Math.floor(random() * persons.size()));
        }
    }

    private static void swap(List<Person> persons, int p1, int p2) {
        Person temp = persons.get(p1);
        Person temp2 = persons.get(p2);
        persons.remove(p1);
        persons.add(p1, temp2);
        persons.remove(p2);
        persons.add(p2, temp);
    }

    static Map<String, Person> assignSantas() {
        Map<String, Person> santas = new HashMap<String, Person>();
        return null;
    }

    static boolean addPerson(List<Person> persons, String person) {
        if ("".equals(person)) {
            return false;
        }

        String[] personData = person.split("\\s+-\\s+", 2);

        String name = personData[0];

        String[] groups = personData[1].split("\\s+", 0);

        persons.add(new Person(name, groups));
        return true;
    }

    static class Person {
        final String name;
        final Set<String> groups;

        Person(String name, String... groups) {
            this.name = name;

            Set<String> groupset = new HashSet<String>();
            for (String group : groups) {
                groupset.add(group);
            }

            this.groups = Collections.unmodifiableSet(groupset);
        }

        @Override
        public String toString() {
            return name;
        }
    }
}
