package com.temporary.santa.dbmgmt.group;

import java.util.NoSuchElementException;

import com.temporary.santa.dbmgmt.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.temporary.santa.dbmgmt.group.GroupRepository;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	public Group createGroup(String groupName, String groupPass, String maxAmount, String releaseDate) {
		if (groupRepository.existsById(groupName)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Group already created; can't overwrite.");
		}

		return groupRepository.insert(new Group(groupName, groupPass, maxAmount, releaseDate));
	}

	public Group retrieveGroup(String groupName, String groupPass) {
		Group g;

		try {
			g = groupRepository.findById(groupName).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "", e);
		}

		if (!groupPass.equals(g.getGroupPass())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}

		return g;
	}

	// This set of methods is set up for a database without a users collection
	public Group addUserToGroup(String groupName, String groupPass, User u) {
		Group g;
		System.out.println("Adding User " + u.toString() + " to group " + groupName);
		try {
			g = groupRepository.findById(groupName).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "", e);
		}

		if (!groupPass.equals(g.getGroupPass())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		} else {
			g.addUser(u);
			groupRepository.save(g);
		}

		return g;
	}
}
