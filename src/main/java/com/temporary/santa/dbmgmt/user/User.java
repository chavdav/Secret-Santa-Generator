package com.temporary.santa.dbmgmt.user;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.temporary.santa.dbmgmt.group.Group;

//@Document(collection="users")
public class User {

	private String firstName;
	private String lastName;
	private String email;
	private String wishlist;

	private Map<String, String> blacklist;

	public User(String firstName, String lastName, String email, String wishlist, Map<String, String> blacklist) {
		this.firstName = firstName.trim();
		this.lastName = lastName.trim();
		this.email = email.trim();
		this.wishlist = wishlist.trim();

		/*
		 * if (blacklist != null) { String[] namesArr = blacklistNames.split(",", 5);
		 * 
		 * List<String> names = new ArrayList<>(); for (String n : namesArr) {
		 * names.add(n.trim()); } }
		 */
		this.blacklist = blacklist;
	}

	public void sendEmail(User recipient) {
		String subject = this.firstName + ", you've been assigned a Secret Santa Recipient!";
		Email to = new Email(this.email);

		Content content = new Content("text/plain", "Dear " + this.firstName
				+ ", \n\nCongratulations on receiving your recipient - hopefully you get them something good! If they have created "
				+ "a wish list then it will be listed down below. \n\nYour Secret Santa Recipient is - \n\nName: "
				+ recipient.getFirstName() + " " + recipient.getLastName() + "\n\n" + "Wish List: "
				+ recipient.getWishlist() + "\n\nHappy Holidays, \n\nBrown Elves");

		Mail m = new Mail(null, subject, to, content);
		sendEmail(m);
	}

	public void sendEmail(Group g) {
		String subject = this.firstName + ", you've been added to a Secret Santa Group!";
		Email to = new Email(this.email);

		Content content = new Content("text/plain",
				"Dear " + this.firstName + ", \n\nYou've been added to group " + g.getGroupName() + ", with code: "
						+ g.getGroupPass() + "\n\nShare this with friends to have them join: " + g.getShareLink()
						+ "\n\nHappy Holidays, \n\nBrown Elves");

		Mail m = new Mail(null, subject, to, content);
		sendEmail(m);
	}

	private void sendEmail(Mail mail) {
		Email from = new Email("Brown-Elves@da-north-pole.icy");
		mail.setFrom(from);

		SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
		Request request = new Request();
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public int hashCode() {
		return Objects.hash(firstName.toLowerCase(), lastName.toLowerCase(), email.toLowerCase());
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;

		return this.firstName.equalsIgnoreCase(other.firstName) && this.lastName.equalsIgnoreCase(other.lastName)
				&& this.email.equalsIgnoreCase(other.email);
	}

	public String getWishlist() {
		return wishlist;
	}

	public void setWishlist(String wishlist) {
		this.wishlist = wishlist;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Map<String, String> getBlacklist() {
		return blacklist;
	}

	public void setBlacklist(Map<String, String> blacklist) {
		this.blacklist = blacklist;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String toString() {
		return firstName + ", " + lastName + ", " + email + ", " + wishlist;
	}
}
