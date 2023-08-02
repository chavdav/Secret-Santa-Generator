package com.temporary.santa.dbmgmt.group;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.temporary.santa.dbmgmt.user.User;

@Document(collection = "groups")
public class Group {

	@Id
	private String groupName;
	private String groupPass;
	private String maxDollarAmount;
	private Set<User> users;
	private Map<String, User> assignments;
	private String releaseDate;
	private boolean usersHaveBeenNotified = false;

	private static final int MAX_ASSIGNMENT_ATTEMPTS = 1000;

	public Group(String groupName, String groupPass, String maxDollarAmount, String releaseDate) {
		users = new HashSet<User>();
		this.groupName = groupName;
		this.groupPass = groupPass;
		this.maxDollarAmount = maxDollarAmount;
		LocalDate.parse(releaseDate); // ensure it can be parsed
		this.releaseDate = releaseDate;
	}

	public String getShareLink() {
		return "http://secret-santa-321.herokuapp.com/#/joinagroup/share/" + groupName + "/" + groupPass;
	}

	public boolean usersHaveBeenNotified() {
		return usersHaveBeenNotified;
	}

	public void notifyUsers() {
		Map<User, User> userAss = assignUsers(users);

		assignments = new HashMap<String, User>();
		User u1, u2;
		for (Entry<User, User> e : userAss.entrySet()) {
			u1 = e.getKey();
			u2 = e.getValue();
			u1.sendEmail(u2);
			assignments.put(Integer.toString(u2.hashCode()), u1);
		}

		usersHaveBeenNotified = true;
	}

	private Map<User, User> assignUsers(Set<User> us) {
		Map<User, User> uAss = new HashMap();

		List<User> random = new ArrayList();
		random.addAll(us);
		Collections.shuffle(random);

		Iterator<User> i = random.iterator();
		for (User u : us) {
			uAss.put(u, i.next());
		}

		validateAndAdjust(uAss);
		return uAss;
	}

	private Map<User, User> validateAndAdjust(Map<User, User> assignments) {
		User key;
		int i = 0;
		for (; i < MAX_ASSIGNMENT_ATTEMPTS && (key = validate(assignments)) != null; i++) {
			adjust(assignments, key);
		}

		if (MAX_ASSIGNMENT_ATTEMPTS == i) {
			System.out.println("Reached max attempts for group " + groupName);
		}

		return assignments;
	}

	/**
	 * Adjusts by swapping the problem assignment pair with another pair, where all
	 * four users would have compatible assignments.
	 */
	private static void adjust(Map<User, User> assignments, User key) {
		User value = assignments.get(key);

		for (Entry<User, User> entry : assignments.entrySet()) {
			if (!isInvalid(key, entry.getValue()) && !isInvalid(entry.getKey(), value)) {
				swap(assignments, key, entry.getKey());
				return;
			}
		}
	}

	/**
	 * Return the user that is assigned someone they should not be. Return null if
	 * all assignments are proper.
	 */
	private static User validate(Map<User, User> assignments) {
		for (Entry<User, User> entry : assignments.entrySet()) {
			if (isInvalid(entry.getKey(), entry.getValue())) {
				return entry.getKey();
			}
		}
		return null;
	}

	private static void swap(Map<User, User> finalAssignments, User p1, User p2) {
		User temp = finalAssignments.get(p1);
		User temp2 = finalAssignments.get(p2);
		finalAssignments.put(p1, temp2);
		finalAssignments.put(p2, temp);
	}

	/**
	 * @return true if these should not be assigned to each other.
	 */
	private static boolean isInvalid(User p1, User p2) {
		return p1.getEmail().equalsIgnoreCase(p2.getEmail());
	}

	public boolean addUser(User u) {
		return users.add(u);
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getGroupPass() {
		return groupPass;
	}

	public void setGroupPass(String groupPass) {
		this.groupPass = groupPass;
	}

	public String getMaxAmount() {
		return maxDollarAmount;
	}

	public void setMaxAmount(String maxAmount) {
		this.maxDollarAmount = maxAmount;
	}

	public LocalDate getReleaseDate() {
		return LocalDate.parse(releaseDate);
	}

	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
}
